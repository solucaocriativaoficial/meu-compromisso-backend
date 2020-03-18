const Model = require('../models/Access');
const connection_pg = require('../config/connection_pg')
const bcrypt = require('bcrypt')
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    insert(req, res) {
        const {
            member,
            password_access,
            privileges_m
        } = req.body;
        const hashpassword = bcrypt.hashSync(password_access, 10)
        const token_access = bcrypt.hashSync(password_access, 15)

        Model.create({
            member: member,
            password_access: hashpassword,
            privileges_m: privileges_m,
            token_access: token_access,
            token_expired: Date.date_hashexpired(),
            created_at: Date.timestampCurrent()
        })
        .then(content => {
            console.log(content)
            res.status(200).json({ message: "Acesso cadastrado com sucesso!", token: token_access})
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(401).json({ message: "Erro ao cadastrar acesso!"});
        })
    },
    delete(req, res) {
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            console.log(result)
            res.status(200).json({ message: 'Acesso delete com sucesso!' })
        })
        .catch(error => {
            res.status(400).json({ message: "Erro ao deletar", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    update_password(req, res) {
        const {
            password_access,
        } = req.body;

        Model.update({
            password_access: password_access,
            updated_at: Date.timestampCurrent(),
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(result => {
                res.json({ message: "Senha atualizada com sucesso!", status: "ok" })
            })
            .catch(error => {
                res.json({ message: "Erro ao atualizar senha!", status: "erro", complete_erro: error});
                error_handling.getError(error);
            })
    },
    update_privileges(req, res) {
        const {
            privileges_m
        } = req.body;

        Model.update({
            privileges_m: privileges_m,
            updated_at: Date.timestampCurrent(),
        }, {
            where: {
                id: req.body.id
            }
        })
        .then(result => {
            res.json({ message: "Privilégios atualizados com sucesso!", status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar privilégios!", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    auth(req, res){
        const { cpf, password_access } = req.body;
        const comand = {
            text: `SELECT privileges_m, token_access, token_expired FROM Auth WHERE cpf=$1`,
            values: [cpf]
        }

        connection_pg
        .query(comand)
        .then(async content => {
            const { rowCount, rows } = content;

            if(!rowCount)
            res.status(401).json({message: "Membro não cadastrado!"})

            const verification_token = bcrypt.compareSync(password_access, rows[0].token_access);
            if(!verification_token)
            res.status(401).json({message: "CPF ou senha inválida"})

            res.status(200).json(rows[0])
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro na consulta!"})
        })
    }
}