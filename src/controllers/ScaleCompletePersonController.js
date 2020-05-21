const connection = require('../database/connection_database_pg');
const ChurcModel = require('../models/Churc');


const getDistrict = async (churc_id) => {
    const results = await ChurcModel.findAll({
        where:{
            id: churc_id
        },
        attributes:['district']
    })
    return results[0].district;
}

module.exports = {
    async i_scale(req, res){
        try {
            const query = {
                text:"SELECT * FROM scale_complete_person WHERE person=$1",
                values: [req.person_id]
            }
            const list_person = await connection.query(query)
            if(!list_person.rowCount)
            res.status(200).json({
                success: false,
                message: "Nenhum registro encontrado!"
            })
            
            res.status(200).json({
                success: true,
                content: list_person.rows
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    async scale_complete_person(req, res){
        try {
            const churc = req.churc_id;
            const district = await getDistrict(churc);
            const query = {
                text:"SELECT * FROM scale_complete_person WHERE district_id=$1 ORDER BY churc_name",
                values: [district]
            }
            const list_person = await connection.query(query)
            if(!list_person.rowCount)
            res.status(200).json({
                success: false,
                message: "Nenhum registro encontrado!"
            })
            
            res.status(200).json({
                success: true,
                content: list_person.rows
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
}