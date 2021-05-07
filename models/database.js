const {Pool} = require('pg');

const Connection = new Pool({
    user: 'postgres',     //your postgres username
    host: 'localhost', 
    database: 'rms', //your local database 
    password: 'postgres', //your postgres user password
    port: 5432, //your postgres running port
});

Connection.connect();


module.exports = Connection;
