const { getAdminDatabase } = require('./db');
const helper = require('../helper');
const { listPerPage } = require('../config').settings;
const { getRepo } = require('./repository');

const getProfiles = async (application, instance, page = 1) => {
  const offset = helper.getOffset(page, listPerPage);
  const dbName = getAdminDatabase(application, instance);
  const repo = await getRepo(dbName);

  const profiles = await repo.profile.findAll({
    limit: listPerPage,
    offset: offset,
    include: {model: repo.application, as: 'applications'},
  });

  return profiles;
};

module.exports = {
  getProfiles,
};
