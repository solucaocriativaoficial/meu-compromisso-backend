const Model = require('../models/Currents_departments');
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
            departament,
            member,
            member_role,
            year,
            churc,
            created_user
        } = req.body;
        Model.create({
            departament: departament,
            member: member,
            member_role: member_role,
            year: year,
            churc: churc,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: created_user
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
            departament,
            member,
            member_role,
            year,
            churc,
            updated_user
        } = req.body;
        Model.update({
            departament: departament,
            member: member,
            member_role: member_role,
            year: year,
            churc: churc,
            updated_at: Date.timestampCurrent(),
            updated_user: updated_user,
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