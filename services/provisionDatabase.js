const { databaseExists, createDatabase } = require('./db');

const provisionDatabase = async (name, template) => {
  if (await databaseExists(name)) {
    console.log(`Database: '${name}' already exists`);
    return {
      success: false,
      statusCode: 409,
      message: `Database: '${name}' already exists`,
    };
  } else if (!await databaseExists(template)) {
    console.log(`Template database: '${template}' does not exist`);
    return {
      success: false,
      statusCode: 400,
      message: `Template database: '${template}' does not exists`,
    };
  }

  const result = await createDatabase({ name, template });

  console.log(result);

  return { success: true };
};

module.exports = provisionDatabase;
