const usuarioModel = require('../models/usuarioModel');

function addUsuario(req, res){
    usuarioModel.addUsuario(req.body)
    .then(id => {
        res.status(200).json(id);
    })
    .catch(error => {
        console.log(error.sqlMessage);
        res.sendStatus(500);
    });
}

function loginUsuario(req, res){
    usuarioModel.loginUsuario(req.body.usuario, req.body.senha)
    .then(user => {
        if(!user || user.length === 0) res.sendStatus(404);
        else {
            delete user.senha;
            res.status(200).json(user);
        }
    })
    .catch(error => {
        console.log(error.sqlMessage);
        res.sendStatus(400);
    });
}

function updateUsuario(req, res){
    usuarioModel.updateUsuario(req.params.id, req.body)
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error.sqlMessage);
        res.sendStatus(500);
    });
}

function deleteUsuario(req, res){
    usuarioModel.deleteUsuario(req.params.id)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
}

module.exports = {
    addUsuario, loginUsuario, 
    updateUsuario, deleteUsuario,
};