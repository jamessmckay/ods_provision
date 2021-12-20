const {Client} = require('pg');
const config = require('../config').postgres;

const getClient = (dbName) => {
  const context = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: `${dbName}`,
  };

  return new Client(context);
};

const query = async (dbName, query, params) => {
  const client = getClient(dbName);

  await client.connect();

  let res = '';

  if (params) {
    res = await client.query(query, params);
  } else {
    res = await client.query(query);
  }

  await client.end();

  return {rows: res.rows, fields: res.fields};
};

const createDatabase = async (context) => {
  console.log(context);
  const sql = `CREATE DATABASE ${context.name} TEMPLATE ${context.template};`;

  return await query('postgres', sql, null);
};

module.exports = {
  query,
  createDatabase,
};
