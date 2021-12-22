const db = require('./db');
const helper = require('../helper');
const {listPerPage} = require('../config').settings;
const {Response, Metadata} = require('./response');

const getProfiles = async (application, instance, page =1) => {
  const offset = helper.getOffset(page, listPerPage);
  const dbName = db.buildDatabaseName(application, 'admin', instance);

  const sql = 'select profilename from dbo.profiles';

  const { rows, total } = await db.query(dbName, sql, [offset, listPerPage]);

  console.log(rows);

  const profiles = helper.emptyOrRows(rows).map((row) => row.profilename);

  return new Response({ profiles: profiles }, new Metadata(page, listPerPage, total));
};

module.exports = {
  getProfiles,
};
