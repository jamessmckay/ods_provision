const { addSequelizeConnectionToRepo } = require('./dbConnector');
let dbRepo = {};

const getRepo = async (dbName) => {
  if (!dbRepo[dbName]) {
    dbRepo = await addSequelizeConnectionToRepo(dbRepo, dbName);
  }

  return dbRepo[dbName];
};

module.exports = { getRepo };
