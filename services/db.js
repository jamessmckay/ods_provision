const { Client } = require('pg');
const config = require('../config').postgres;

const getClient = (db_name) => {
    let context = {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: `${db_name}`
    };
    // console.log(context);

    return new Client(context);
}

const query = async (db_name, query, params) => {
    try {
        const client = getClient(db_name);

        await client.connect();

        let {rows, fields}  = await client.query(query, params);
        await client.end();

        return rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    query
}