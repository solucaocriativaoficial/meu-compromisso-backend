const connection_pg = require('../config/connection_pg');

module.exports = {
    search_member(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM member WHERE complete_name ILIKE $1`,
            values: [`%${filter}%` ]
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
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    },
    search_division(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM division WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
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
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    },
    search_association(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM association WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
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
            const status = "erro";
            res.json({ message: "Erro na consulta!", status: status, complete_erro: error})
            error_handling.getError(error);
        })
    }
}