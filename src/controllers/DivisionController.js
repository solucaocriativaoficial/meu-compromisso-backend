const Model = require('../models/Division');
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
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
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
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    insert(req, res){
        const { name, created_user, abbreviation } = req.body;
        Model.create({
            name: name,
            abbreviation:abbreviation,
            created_at: Date.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.json({ message: 'Divisão cadastrada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar divisão!", status: "erro", complete_erro: error})
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
            res.json({ message: 'Divisão deletada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar divisão!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    update(req, res){
        const { name, updated_user, abbreviation } = req.body;
        Model.update({
            name: name,
            abbreviation:abbreviation,
            updated_at: Date.timestampCurrent(),
            updated_user: updated_user,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Divisão atualizada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar divisão!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    }
}