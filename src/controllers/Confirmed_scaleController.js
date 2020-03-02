const Model = require('../models/Confirmed_scale');
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
            theme_for_action,
            confirmation_member
        } = req.body;
        Model.create({
            scale: scale,
            theme_for_action: theme_for_action,
            confirmation_date: Date.timestampCurrent(),
            confirmation_member: confirmation_member,
        })
        .then(content => {
            res.json({ message: 'Cadastrado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar!", status: "erro", complete_erro: error})
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
            res.json({ message: 'Deletado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    update(req, res){
        const {
            scale,
            theme_for_action,
            confirmation_member
        } = req.body;
        Model.update({
            scale: scale,
            theme_for_action: theme_for_action,
            confirmation_date: Date.timestampCurrent(),
            confirmation_member: confirmation_member,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Atualizado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    }
}