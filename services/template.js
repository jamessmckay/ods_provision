const db = require('./db');
const helper = require('../helper');
const { listPerPage } = require('../config').settings;
const { Response, Metadata } = require('./response');

const getTemplates = async (page = 1) => {
  const offset = helper.getOffset(page, listPerPage);

  const sql = `
    select datname as template
    from pg_database
    where datistemplate=true
        and datname not in ('template1', 'template0')
    `;

  const { rows, total } = await db.query('postgres', sql, [offset, listPerPage]);

  console.log(rows);

  const templates = helper.emptyOrRows(rows).map((row) => row.template);

  return new Response({ templates: templates }, new Metadata(page, listPerPage, total));
};

module.exports = {
  getTemplates,
};
