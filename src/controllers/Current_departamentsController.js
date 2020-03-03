const connection_pg = require('../config/connection_pg');
const Model = require('../models/Currents_departments');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    findAll(req, res){
        const comand = {
            text: "SELECT * FROM view_current_department"
        };
        connection_pg
        .query(comand)
        .then(content => {
            const {rowCount, rows} = content
            if(rowCount){
                res.json(rows)
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
            department,
            member,
            member_role,
            churc,
            created_user
        } = req.body;

        const comand = {
            text: "INSERT INTO currents_departments (department, member, member_role, year, churc, created_at, updated_at, created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
            values:[
                department,
                member,
                member_role,
                Date.yearCurrent(),
                churc,
                Date.timestampCurrent(),
                Date.timestampCurrent(),
                created_user
            ]
        };
        connection_pg
        .query(comand)
        .then(content => {
            const { rows } = content
            res.json({ message: 'Cadastrado com sucesso!', status: "ok"})
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar!", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.body.id
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
            updated: Date.timestampCurrent,
            updated_user: updated_user
        },{
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