const { getAdminDatabase } = require('./db');
const helper = require('../helper');
const { listPerPage } = require('../config').settings;
const { getRepo } = require('./repository');

const getApplications = async (application, instance, page = 1) => {
  const offset = helper.getOffset(page, listPerPage);
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const applications = await repo.application.findAll({
    limit: listPerPage,
    offset: offset,
    // raw: true,
    include: [
      { model: repo.profile },
      { model: repo.vendor, include: [{ model: repo.vendorNamespacePrefixes }] },
      { model: repo.apiClient },
    ],
  });

  return applications;
};

const getApplicationEducationOrganizations = async (application, instance, page = 1) => {
  const dbName = getAdminDatabase(application, instance);
  const offset = helper.getOffset(page, listPerPage);
  const repo = await getRepo(dbName);

  const [results] = await repo.sequelize.query(`
  select apiclient_apiclientid as apiclientid, educationorganizationid as edorgid
  from dbo.apiclientapplicationeducationorganizations a
  inner join dbo.applicationeducationorganizations b
    on a.applicationedorg_applicationedorgid = b.applicationeducationorganizationid
  OFFSET :offset LIMIT :limit`, {
    nest: false,
    replacements: {
      offset: offset,
      limit: listPerPage,
    },
  });

  const group = results.reduce((obj, item) => {
    obj[item.apiclientid] = obj[item.apiclientid] || [];
    obj[item.apiclientid].push(item.edorgid);
    return obj;
  }, {});

  const apiClientEdOrgs = Object.keys(group).map((key) => {
    return { apiClientId: key, edOrgIds: group[key] };
  });

  return apiClientEdOrgs;
};

/* Sample DTO for adding applications
{
  "applications": [
    {
      "application_name": "TEA Test Sandbox",
      "key": "key",
      "secret": "secret",
      "claim_set": "TX SIS Vendor",
      "vendor_name": "TEA Test SIS Vendor",
      "profile": "TEA-Modify-EdOrgs",
      "ed_orgs": [
        1,
        701603
      ],
      "namespace_prefixes": [
        "uri://ed-fi.org",
        "uri://tea.texas.gov"
      ],
      }
    }
  ]
}

Secrets are generated with a random string,
Keys will use a pattern naming scheme, otherwise a random string.
  * 6 chars from ed org + last 6 of the instance id out of the admin console + 6 chars application id
  * eg: hisd-ab123d-ef8cg4-014901


This dto shows an array and that will be another endpoint to allow for a bulk update
When generating an application, we need to also generate the key and secret, returning
the keys and secrets with the dto with a successful 201

To add the vendors/applications the following steps are required:

CALL config.add_application ('Sandbox Application', 'http://ed-fi.org', 'Ed-Fi Sandbox');
CALL config.add_ed_org_to_application ('Sandbox Application', 255901);
CALL config.add_ed_org_to_application ('Sandbox Application', 255900);
CALL config.add_vendor ('Sandbox Vendor');
CALL config.add_vendor_namespace_prefix ('Sandbox Vendor', 'uri://ed-fi.org');
CALL config.add_vendor_namespace_prefix ('Sandbox Vendor', 'uri://tea.texas.gov');
CALL config.add_vendor_to_application ('Sandbox Vendor', 'Sandbox Application');
CALL config.add_api_client ('Sandbox Application', 'Sandbox Vendor', 'key', 'secret');
CALL config.add_ed_org_to_api_client_application ('Sandbox Application', 'Sandbox Vendor', 255901);
CALL config.add_ed_org_to_api_client_application ('Sandbox Application', 'Sandbox Vendor', 255900);

*/
const addApplication = async (application, instance, dto) => {
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  // create the application object
  let [results] = await repo.sequelize.query(`
  CALL config.add_application (:name, 'http://ed-fi.org', :claim_set);
  `, {
    replacements: {
      name: dto.application_name,
      claim_set: dto.claim_set,
    },
  });

  console.log(JSON.stringify(results));

  // add ed orgs
  dto.ed_orgs.forEach(async (edOrg) => {
    [results] = await repo.sequelize.query(`
    CALL config.add_ed_org_to_application (:applicationName, :edOrg);
    `, {
      replacements: {
        applicationName: dto.application_name,
        edOrg: edOrg,
      },
    });
  });

  // add vendor
  [results] = await repo.sequelize.query(`
  CALL config.add_vendor (:vendorName);
  `, {
    replacements: {
      vendorName: dto.vendor_name,
    },
  });

  // add namespace prefixes
  dto.namespace_prefixes.forEach(async (namespacePrefix) => {
    [results] = await repo.sequelize.query(`
    CALL config.add_vendor_namespace_prefix (:vendorName, :namespacePrefix);
    `, {
      replacements: {
        vendorName: dto.vendor_name,
        namespacePrefix: namespacePrefix,
      },
    });
  });

  // add vendor to application
  [results] = await repo.sequelize.query(`
  CALL config.add_vendor_to_application (:vendorName, :applicationName);
  `, {
    replacements: {
      applicationName: dto.application_name,
      vendorName: dto.vendor_name,
    },
  });

  // create api client for the vendor
  const creds = helper.generateKeySecret();

  if (dto.key && dto.key !== '') {
    creds.key = dto.key;
  }

  if (dto.secret && dto.secret !== '') {
    creds.secret = dto.secret;
  }

  [results] = await repo.sequelize.query(`
  CALL config.add_api_client (:applicationName, :vendorName, :key, :secret);
  `, {
    replacements: {
      applicationName: dto.application_name,
      vendorName: dto.vendor_name,
      key: creds.key,
      secret: creds.secret,
    },
  });

  // add ed orgs to the api client
  dto.ed_orgs.forEach(async (edOrg) => {
    [results] = await repo.sequelize.query(`
    CALL config.add_ed_org_to_api_client_application (:applicationName, :vendorName, :edOrg);
    `, {
      replacements: {
        vendorName: dto.vendor_name,
        applicationName: dto.application_name,
        edOrg: edOrg,
      },
    });
  });

  // apply the profile if provided
  if (dto.profile && dto.profile !== '') {
    [results] = await repo.sequelize.query(`
    INSERT INTO dbo.profileapplications (profile_profileid, application_applicationid)
    VALUES ((SELECT profileid FROM dbo.profiles WHERE profilename = :profile),
    (SELECT config.get_application_id (:applicationName)));
    `, {
      replacements: {
        profile: dto.profile,
        applicationName: dto.application_name,
      },
    });
  }

  return creds;
};

module.exports = {
  getApplications,
  getApplicationEducationOrganizations,
  addApplication,
};
