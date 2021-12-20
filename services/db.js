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
  // console.log(context);

  return new Client(context);
};

const query = async (dbName, query, params) => {
  try {
    const client = getClient(dbName);

    await client.connect();

    const {rows} = await client.query(query, params);
    await client.end();

    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  query,
};
