const Model = require('../models/Scale');
const connection_pg = require('../config/connection_pg');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

async function insertScale(body, Date)
{
    const {
        scale_type,
        churc,
        who_is_scaled,
        id_who_is_scaled,
        scale_date,
        confirmed_by_member,
        scale_responsible,
        created_user
    } = body;

    const query_insert_scale_withDepartment = `INSERT INTO scale (scale_type, churc, ${who_is_scaled}, scale_date, confirmed_by_member, scale_responsible, created_at, updated_at, created_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    const params_insert_scale_withDepartment = [
        scale_type,
        churc,
        id_who_is_scaled,
        scale_date,
        confirmed_by_member,
        scale_responsible,
        Date.timestampCurrent(),
        created_user
    ];

    const response_insert_scale_department = await connection_pg.query(query_insert_scale_withDepartment, params_insert_scale_withDepartment)
    return response_insert_scale_department.rowCount;    
}

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
    myScale_I(req, res){
       const comand = {
           text: "SELECT * FROM myScale_I WHERE id_member=$1",
           values:[req.params.id]
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
    myScale_Dep(req, res){
        const comand = {
            text: "SELECT * FROM myScale_Dep WHERE id_department=$1",
            values:[req.params.id]
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
    async insert(req, res){
        const { who_is_scaled, id_who_is_scaled } = req.body;
        let return_insertScale = null;

        try{
            if(who_is_scaled == "department")
            {
                const query = "SELECT department FROM currents_departments WHERE department=$1";
                const params = [id_who_is_scaled];

                const response_search = await connection_pg.query(query, params);
                const { rowCount } = response_search;
                if(rowCount){
                    return_insertScale = await insertScale(req.body, Date);
                    const message_return = return_insertScale ? "Cadastrado com sucesso!": "Não foi possível cadastrar";
                    await res.json({ message: message_return, status: "ok" })
                }
                else{
                    res.json({ message: 'O departamento não esta cadastrado no ano atual!', status: "ok" })
                }
            }
            else
            {
                return_insertScale = insertScale(req.body, Date);
                const message_return = return_insertScale ? "Cadastrado com sucesso!": "Não foi possível cadastrar";
                res.json({ message: message_return, status: "ok" })
            }

        }catch(error){
            res.json({message: "algum erro aconteceu em tudo aqui"})
        }

        
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