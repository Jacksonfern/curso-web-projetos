const connection = require('../../config/database');
const { deleteReservasFromUsuario } = require('./reservaModel');

function addUsuario(user){
    const sql = "INSERT INTO tbusuario SET ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, user, (error, result) => {
            if(error) reject(error);
            resolve(result.insertId);
        });
    });
}

function loginUsuario(user, pass){
    const sql = "SELECT * FROM tbusuario "
        + "WHERE (matricula = ? OR email = ?) AND senha = ? LIMIT 1";
    return new Promise((resolve, reject) => {
        connection.query(sql, [user, user, pass], (error, results) => {
            if(error) reject(error);
            resolve(results[0]);
        });
    }) ;
}

function updateUsuario(id, data){
    const sql = "UPDATE tbusuario SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [data, id], error => {
            if(error) reject(error);
            resolve();
        });
    });
}

function deleteUsuario(id){
    const sql = "DELETE FROM tbusuario WHERE id = ?";
    return new Promise(async (resolve, reject) => {
        try{ 
            await deleteReservasFromUsuario(id); 
        }catch(error){ 
            reject(error);
        }

        connection.query(sql, id, error => {
            if(error) reject(error);
            resolve();
        });
    });
}

module.exports = {
    addUsuario, loginUsuario,
    updateUsuario, deleteUsuario,
}