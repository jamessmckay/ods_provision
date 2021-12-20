const env = process.env;

const config = {
    postgres: {
        host: env.PGHOST || 'localhost',
        port: env.PGPORT || 5432,
        user: env.PGUSER || 'postgres',
        password: env.PGPASSWORD || 'P@ssw0rd'
    },
    settings: {
        port: env.PORT || 5000,
        listPerPage: env.LIST_PER_PAGE || 10
    }
}

module.exports = config;