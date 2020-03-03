const Model = require('../models/Scale');
const connection_pg = require('../config/connection_pg');
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
    myScale(req, res){
       const comand = {
           text: "SELECT * FROM myScale WHERE id_member=$1",
           values:[req.params.id_member]
       }
       connection_pg
       .query(comand)
        .then(content => {
            const { rowCount, rows } = content;
            if(rowCount){
                res.json(rows)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado!', status: "ok" })
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
            scale_type,
            churc,
            member,
            visitor_member,
            scale_date,
            confirmed_by_member,
            scale_responsible,
            created_user
        } = req.body;
        Model.create({
            scale_type:scale_type,
            churc:churc,
            member:member,
            visitor_member:visitor_member,
            scale_date:scale_date,
            confirmed_by_member:confirmed_by_member,
            scale_responsible:scale_responsible,
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
            scale_type,
            churc,
            member,
            visitor_member,
            scale_date,
            confirmed_by_member,
            scale_responsible,
            updated_user
        } = req.body;
        Model.update({
            scale_type:scale_type,
            churc:churc,
            member:member,
            visitor_member:visitor_member,
            scale_date:scale_date,
            confirmed_by_member:confirmed_by_member,
            scale_responsible:scale_responsible,
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