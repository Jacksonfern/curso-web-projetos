const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((error) => {
    if(error)
        throw new Error(`${error.code}: ${error.sqlMessage}`);
    console.log("Connection established...");
});

module.exports = connection;