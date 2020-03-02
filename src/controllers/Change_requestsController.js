const Model = require('../models/Change_request');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    findAll(req, res){
        Model.findAll()
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    findOne(req, res){
        Model.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    insert(req, res){
        const {
            scale,
            requested_member,
        } = req.body;
        Model.create({
            scale: scale,
            requested_member: requested_member,
            requested_date: Date.timestampCurrent,
        })
        .then(content => {
            res.json({ message: 'Igreja cadastrada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Igreja deletada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    update(req, res){
        const {
            scale,
            requested_member
        } = req.body;
        Model.update({
            scale: scale,
            requested_member: requested_member,
            accepted_date: Date.dateCurrent
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Igreja atualizada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    }
}