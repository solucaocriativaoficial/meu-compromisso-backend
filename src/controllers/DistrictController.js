const Model = require('../models/District');
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
        const { name, association, shepherd, created_user } = req.body;
        Model.create({
            name: name,
            association: association,
            shepherd: shepherd,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.json({ message: 'Distrito cadastrado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar distrito!", status: "erro", complete_erro: error})
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
            res.json({ message: 'Distrito deletado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar distrito!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    update(req, res){
        const { name, association, shepherd, updated_user } = req.body;
        Model.update({
            name: name,
            association: association,
            shepherd: shepherd,
            updated_at: Date.timestampCurrent(),
            updated_user: updated_user,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Distrito atualizado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar distrito!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    }
}