const db = require('./db');
const helper = require('../helper');
const {listPerPage} = require('../config').settings;


const getTemplates = async (page = 1) => {
  const offset = helper.getOffset(page, listPerPage);

  const sql = `
    select datname as template
    from pg_database
    where datistemplate=true
        and datname not in ('template1', 'template0')
    OFFSET $1 LIMIT $2;
    `;

  console.log(sql);

  const rows = await db.query('postgres', sql, [offset, listPerPage]);
  const templates = helper.emptyOrRows(rows).map((row) => row.template);


  return {
    data: {templates: templates},
    meta: {
      page: page,
      page_size: listPerPage,
      total: templates.length,
    },
  };
};

module.exports = {
  getTemplates,
};
