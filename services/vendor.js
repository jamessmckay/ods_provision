const { getAdminDatabase } = require('./db');
const helper = require('../helper');
const { listPerPage } = require('../config').settings;
const { getRepo } = require('./repository');

const getVendors = async (application, instance, page = 1) => {
  const offset = helper.getOffset(page, listPerPage);
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const vendors = await repo.vendor.findAll( {
    limit: listPerPage,
    offset: offset,
  });

  return vendors;
};

const getVendor = async (application, instance, vendorId) => {
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const vendor = await repo.vendor.findByPk(vendorId, {
    include: {model: repo.vendorNamespacePrefixes},
  });

  return vendor;
};

module.exports = {
  getVendors,
  getVendor,
};
