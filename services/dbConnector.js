const fs = require('fs').promises;
const path = require('path');
const Sequelize = require('sequelize');
const { postgres } = require('../config');
const modelsDir = path.resolve(__dirname + '/../models');

const addSequelizeConnectionToRepo = async (dbRepo, database) => {
  const db = {};

  const sequelize = new Sequelize(database, postgres.username, postgres.password, {
    host: postgres.host,
    port: postgres.port,
    dialect: 'postgres',
    logging: console.log,
    quoteIdentifiers: false,
  });

  const files = (await fs.readdir(modelsDir)).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  });

  files.forEach((file) => {
    const p = path.join(modelsDir, file);
    const model = require(p)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  dbRepo[database] = db;

  return dbRepo;
};

module.exports = { addSequelizeConnectionToRepo };
