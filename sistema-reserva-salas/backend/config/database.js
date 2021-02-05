const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //insira sua senha
    database: 'dbreservasalas',
});

connection.connect((error) => {
    if(error)
        throw new Error(`${error.code}: ${error.sqlMessage}`);
    console.log("Connection established...");
});

module.exports = connection;