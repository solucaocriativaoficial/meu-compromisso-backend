const connection_pg = require('../config/connection_pg');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    validation(req, res){
        const {cpf, password_access} = req.body;

        const comand = {
            text: `SELECT * FROM Login WHERE cpf=$1 AND password_access=$2`,
            values: [cpf, password_access]
        }

        connection_pg
        .query(comand)
        .then(content => {
            const { rowCount, rows } = content;
            if(rowCount){
                res.json(rows)
            }
            else{
                res.json({ message: 'CPF ou Senha inválidos!', status: "ok" })
            }
        })
        .catch(error => {
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    }
}