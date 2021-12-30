const db = require('./db');
const helper = require('../helper');

const getTemplates = async () => {
  // eslint-disable-next-line max-len
  const sql = `select datname as template from pg_database where datistemplate=true and datname not in ('template1', 'template0')`;

  const { rows, total } = await db.query('postgres', sql);

  console.log(rows, total);

  const templates = helper.emptyOrRows(rows).map((row) => row.template);

  return templates;
};

module.exports = {
  getTemplates,
};
