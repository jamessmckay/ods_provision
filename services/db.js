const { Client } = require('pg');
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

  let res;
  const sql = `${(query.substr(-1) === ';') ? query.slice(0, -1) : query}`;
  console.log(sql);

  if (params) {
    res = await client.query(`${sql} OFFSET $1 LIMIT $2;`, params);
  } else {
    res = await client.query(sql + ';');
  }

  console.log(`select count(*) as total from (${sql});`);

  const total = Number((await client.query(`select count(*) as total from (${sql}) a;`)).rows[0].total);

  await client.end();

  return { rows: res.rows, fields: res.fields, total: total };
};

const createDatabase = async (context) => {
  console.log(context);
  const sql = `CREATE DATABASE ${context.name} TEMPLATE ${context.template};`;
  console.log(sql);

  return await query('postgres', sql, null);
};

const databaseExists = async (database) => {
  console.log(database);

  const sql = `SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname='${database}');`;

  const { rows } = await query('postgres', sql, null);
  console.log(sql, rows);

  return rows[0].exists;
};

const buildDatabaseName = (application, database, instance, schoolYear) => {
  let dbName = `${application}_${database}`;

  if (instance) {
    dbName += `_${instance}`;
  }

  if (schoolYear) {
    dbName += `_${schoolYear}`;
  }

  return dbName;
};

module.exports = {
  query,
  createDatabase,
  databaseExists,
  buildDatabaseName,
};
