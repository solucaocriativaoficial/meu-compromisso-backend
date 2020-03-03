const connection_pg = require('../config/connection_pg');

function doRequest(comand, res)
{
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

module.exports = {
    search_member(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM member WHERE complete_name ILIKE $1`,
            values: [`%${filter}%` ]
        }

        doRequest(comand, res);
    },
    search_division(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM division WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
        }

        doRequest(comand, res);
    },
    search_unity(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM unity WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
        }
        doRequest(comand, res);
    },
    search_association(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM association WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
        }
        doRequest(comand, res);
    },
    search_district(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM district WHERE name ILIKE $1`,
            values: [`%${filter}%` ]
        }
        doRequest(comand, res);
    },
    search_churc(req, res){
        const { filter } = req.body;

        const comand = {
            text: `SELECT * FROM churc WHERE churc_name ILIKE $1`,
            values: [`%${filter}%` ]
        }
        doRequest(comand, res);
    }
}