const salaModel = require('../models/salaModel');

function addSala(req, res){
    salaModel.addSala(req.body)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.sendStatus(500);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

function getBlocos(req, res){
    salaModel.getBlocos()
    .then(results => {
          res.status(200).send(results);
    })
    .catch(error => {
        res.sendStatus(400);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

function getSalaById(req, res){
    const id = [req.params.id];
    salaModel.getSalaById(id)
    .then(results => {
          res.status(200).send(results);
    })
    .catch(error => {
        res.sendStatus(400);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

function getSalasByBloco(req, res){
    const bloco = [req.query.bloco];
    salaModel.getSalasByBloco(bloco)
    .then(results => {
        res.status(200).send(results);
    })
    .catch(error => {
        res.sendStatus(400);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

function updateSala(req, res){
    salaModel.updateSala(req.params.id, req.body)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        res.sendStatus(500);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

function deleteSala(req, res){
    salaModel.deleteSala(req.params.id)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
        console.log(`${error.code}: ${error.sqlMessage}`);
    });
}

module.exports = {
    addSala, getBlocos, getSalaById, 
    getSalasByBloco, updateSala, deleteSala
};