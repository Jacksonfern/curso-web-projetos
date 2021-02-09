const connection = require('../../config/database');

function addReserva(reserva, id_usuario){
    const data = {
        id_usuario,
        id_sala: reserva.idSala,
        horario_inicio: reserva.horarioInicio,
        horario_fim: reserva.horarioFim,
        descricao: reserva.descricao,
    };

    const sql = "INSERT INTO tbsalareservada SET ?";

    return new Promise(async (resolve, reject) => {
        try{
            const conflictSala = await checkReservasFromSala(reserva.idSala, reserva.horarioInicio, reserva.horarioFim);
            if(conflictSala)
                return resolve({ inserted: false, conflict: 'sala', ...conflictSala });
            const conflictUsuario = await checkReservasFromUsuario(id_usuario, reserva.horarioInicio, reserva.horarioFim);
            if(conflictUsuario > 0)
                return resolve({ inserted: false, conflict: 'usuario' });
        }catch(error){
            return reject(error);
        }
        connection.query(sql, data, (error, result) => {
            if(error) reject(error);
            else resolve({ inserted: true, id: result.insertId });
        });
    });
}

function checkReservasFromSala(id, horario_inicio, horario_fim){
    const sql = "SELECT nome, sobrenome "
                + "FROM tbsalareservada INNER JOIN tbusuario "
                + "ON tbusuario.id = tbsalareservada.id_usuario "
                + "WHERE ? <= horario_fim "
                + "AND ? >= horario_inicio "
                + "AND tbsalareservada.id_sala = ?";

    return new Promise((resolve, reject) => {
        connection.query(sql, [horario_inicio, horario_fim, id], (error, results) => {
            if(error) reject(error);
            else if(results.length === 0) resolve();
            else resolve(results[0]);
        });
    }).catch(error => { throw new Error(error); })
}

function checkReservasFromUsuario(id, horario_inicio, horario_fim){
    const sql = "SELECT COUNT(*) AS quantidade FROM tbsalareservada "
                + "WHERE ? <= horario_fim "
                + "AND ? >= horario_inicio "
                + "AND id_usuario = ?";

    return new Promise((resolve, reject) => {
        connection.query(sql, [horario_inicio, horario_fim, id], (error, result) => {
            if(error) reject(error);
            else resolve(result[0].quantidade > 0);
        });
    }).catch(error => { throw new Error(error); });
}

function getReservasByUser(id){
    const sql = "SELECT sala, horario_inicio, horario_fim, descricao "
                + "FROM tbsalareservada INNER JOIN tbsala "
                + "ON tbsala.id = tbsalareservada.id_sala "
                + "WHERE tbsalareservada.id_usuario = ?";
    
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (error, results) => {
            if(error) reject(error);
            else resolve(results);
        });
    });
}

function getReservasBySala(id){
    const sql = "SELECT nome, sobrenome, horario_inicio, horario_fim, descricao "
                + "FROM tbsalareservada INNER JOIN tbusuario "
                + "ON tbusuario.id = tbsalareservada.id_usuario "
                + "WHERE tbsalareservada.id_sala = ?";
    
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (error, results) => {
            if(error) reject(error);
            else resolve(results);
        });
    });
}

function deleteReserva(id){
    const sql = "DELETE FROM tbsalareservada WHERE id = ?";

    return new Promise((resolve, reject) => {
        connection.query(sql, id, (error) => {
            if(error) reject(error);
            else resolve();
        });
    });
}

function deleteReservasFromUsuario(id){
    const sql = "DELETE FROM tbsalareservada WHERE id_usuario = ?";

    return new Promise((resolve, reject) => {
        connection.query(sql, id, (error) => {
            if(error) reject(error);
            resolve();
        })
    }).catch(error => { throw new Error(error); })
}

module.exports = {
    addReserva, getReservasByUser,
    getReservasBySala, deleteReserva,
    deleteReservasFromUsuario,
}