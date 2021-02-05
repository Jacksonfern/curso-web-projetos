const connection = require('../../config/database');

function addSala(data){
    const sql = "INSERT INTO tbsala SET ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (error, results) => {
            if(error) reject(error);
            resolve(results.insertId);
        });
    });
}

function getBlocos(){
    const sql = "SELECT bloco FROM tbsala ORDER BY bloco";
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
}

function getSalaById(id){
    const sql = "SELECT *FROM tbsala WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
}

function getSalasByBloco(bloco){
    const sql = "SELECT id, sala FROM tbsala WHERE bloco = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, bloco, (error, results) => {
            if(error) reject(error);
            resolve(results);
        });
    });
}

function updateSala(id, data){
    const sql = "UPDATE tbsala SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [data, id], (error) => {
            if(error) reject(error);
            resolve();
        });
    });
}

function deleteSala(id){
    const sql = "DELETE FROM tbsala WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [id], (error) => {
            if(error) reject(error);
            resolve();
        });
    });
}

module.exports = {
    addSala, getBlocos, getSalasByBloco,
    getSalaById, updateSala, deleteSala,
}