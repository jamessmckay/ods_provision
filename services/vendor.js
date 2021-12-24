const { getAdminDatabase } = require('./db');
const helper = require('../helper');
const { listPerPage } = require('../config').settings;
const { Response } = require('./response');
const { getRepo } = require('./repository');
const { application } = require('express');


const getVendors = async (application, instance, page = 1) => {
  const offset = helper.getOffset(page, listPerPage);
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const vendors = await repo.vendor.findAll( {
    limit: listPerPage,
    offset: offset,
  });

  return new Response(vendors);
};

const getVendor = async (application, instance, vendorId) => {
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const vendor = await repo.vendor.findByPk(vendorId);

  return new Response(vendor);
};

const getVendorNamespaces = async (application, instance, vendorId) => {
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const namespaces = await repo.vendorNamespacePrefixes.findAll({
    where: {
      vendor_vendorid: vendorId,
    },
  });

  return new Response(namespaces);
};

module.exports = {
  getVendors,
  getVendor,
  getVendorNamespaces,
};
