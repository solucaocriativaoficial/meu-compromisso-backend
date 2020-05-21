const connection = require('../database/connection_database_pg');
const {Op} = require('sequelize');
const DepartmentOcupation = require('../models/DepartmentOcupation');

const getMyDepartments = async (person)=>{
    const listMyDepartment = await DepartmentOcupation.findAll({
        where:{
            person: person
        },
        attributes:['department']
    })
    return listMyDepartment;
}

const checkScale = async (listMyDepartment)=>{
    const paramsIds = [];
    let sql = "SELECT * FROM scale_complete_department WHERE ";

    listMyDepartment.forEach((dep, index) => {
        paramsIds.push(dep.dataValues.department)
        sql += ` department=$${index + 1} OR`
    });

    const finalSql = sql.substring(0, sql.length - 2)
    const query = {
        text: `${finalSql} ORDER BY scale_date`,
        values:paramsIds
    }

    const checkMyDepartment = await connection.query(query)
    return checkMyDepartment
}

module.exports = {
    async my_department_scale(req, res){
        try {
            const listMyDepartment = await getMyDepartments(req.person_id);
            if(!listMyDepartment.length)
            res.status(200).json({
                success: false,
                message:"Você não está participando de nenhum departamento!"
            })

            const checkScaledDepartment = await checkScale(listMyDepartment);
            
            if(!checkScaledDepartment.rowCount)
            res.status(200).json({
                success: false,
                message:"Nenhum dos seus departamentos está escalado!"
            })

            res.status(200).json({
                success: true,
                content: checkScaledDepartment.rows
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
}