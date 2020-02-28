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
    },
    insert(req, res){
        const { name, created_user } = req.body;
        Model.create({
            name: name,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.json({ message: 'Divisão cadastrada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar divisão!", status: "erro", complete_erro: error})
            error_handling(status, error);
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
            error_handling(status, error);
        })
    },
    update(req, res){
        const { name, updated_user } = req.body;
        Model.update({
            name: name,
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
            error_handling(status, error);
        })
    }
}