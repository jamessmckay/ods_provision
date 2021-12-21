const env = process.env;
const host = env.HOST || 'localhost';
const version = '0.1.0';
const port = env.PORT || 5000;
const scheme = env.SCHEME || 'http';

const config = {
  postgres: {
    host: env.PGHOST || 'localhost',
    port: env.PGPORT || 5432,
    user: env.PGUSER || 'postgres',
    password: env.PGPASSWORD || 'P@ssw0rd',
  },
  settings: {
    port: port,
    listPerPage: env.LIST_PER_PAGE || 10,
    host: host,
    version: version,
    scheme: scheme,
  },
};

module.exports = config;
