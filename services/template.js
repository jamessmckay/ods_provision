const util = require('util');
const {query} = require('./db');
const helper = require('../helper');


const getTemplates = async () => {
  // eslint-disable-next-line max-len
  const sql = `select datname as template from pg_database where datistemplate=true and datname not in ('template1', 'template0')`;

  const { rows, total } = await query('postgres', sql, null, true);

  console.log(rows, total);

  const templates = helper.emptyOrRows(rows).map((row) => row.template);

  return templates;
};

const importTemplate = async (template) => {

};

module.exports = {
  getTemplates,
};
