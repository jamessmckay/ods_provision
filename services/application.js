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

module.exports = {
  getApplications,
  getApplicationEducationOrganizations,
};
