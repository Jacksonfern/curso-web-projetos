const reservaModel = require('../models/reservaModel');

function addReserva(req, res){
    reservaModel.addReserva(req.body, req.params.id_usuario)
    .then(response => {
        if(response.inserted === false) res.status(200).json(response);
        else res.status(201).json(response.id);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}

function getReservasByUser(req, res){
    reservaModel.getReservasByUser(req.params.id_usuario)
    .then(reservas => {
        res.status(200).json(reservas);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}

function getReservasBySala(req, res){
    reservaModel.getReservasBySala(req.params.id_sala)
    .then(reservas => {
        res.status(200).json(reservas);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}

function deleteReserva(req, res){
    reservaModel.deleteReserva(req.params.id)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}

module.exports = {
    addReserva, getReservasBySala, 
    getReservasByUser, deleteReserva
}