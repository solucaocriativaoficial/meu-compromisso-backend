const connection_pg = require('../config/connection_pg');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    validation_cpf(req, res){
        const { cpf } = req.body;

        const comand = {
            text: `SELECT member FROM Login WHERE cpf=$1`,
            values: [cpf]
        }

        connection_pg
        .query(comand)
        .then(content => {
            const { rowCount, rows } = content;
            if(rowCount){
                res.json(rows)
            }
            else{
                res.json({ message: 'CPF não cadastrado!', status: "ok" })
            }
        })
        .catch(error => {
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    },
    validation_password(req, res){
        const { member, password_access } = req.body;

        const comand = {
            text: `SELECT member, cpf, privileges_m FROM Login WHERE member=$1 AND password_access=$2`,
            values: [member, password_access]
        }

        connection_pg
        .query(comand)
        .then(content => {
            const { rowCount, rows } = content;
            if(rowCount){
                res.json(rows)
            }
            else{
                res.json({ message: 'Senha inválida!', status: "ok" })
            }
        })
        .catch(error => {
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    }
}