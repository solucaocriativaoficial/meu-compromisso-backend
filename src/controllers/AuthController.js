const connection_pg = require('../config/connection_pg')
const error_handling = require('../utils/ErrorHandling')
const bcrypt = require('bcrypt')

module.exports = {
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