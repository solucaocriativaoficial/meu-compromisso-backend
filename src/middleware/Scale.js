const connection = require('../database/connection_database_pg');

module.exports = {
    async verify_date_for_person(req, res, next){
        try {
            const {scale_date, person, ...rest} = req.body;
            const query = {
                text:"SELECT * FROM scale_complete_person where scale_date=$1 and person=$2",
                values: [scale_date, person]
            };
            const results_search_for_person = await connection.query(query)
            if(results_search_for_person.rowCount)
            res.status(200).json({
                success: false,
                message:`Esta pessoa já está escalado na lista de ${results_search_for_person.rows[0].scale_type} na igreja ${results_search_for_person.rows[0].churc_name}!`,
            })

            else
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
    async verify_date_for_department(req, res, next){
        try {
            const {scale_date, department, churc, scale_type, ...rest} = req.body;
            const query = {
                text:"SELECT * FROM scale_complete_department where scale_date=$1 and department=$2 and churc=$3 and scale_type=$4",
                values: [scale_date, department,churc, scale_type]
            };
            const results_search_for_department = await connection.query(query)
            if(results_search_for_department.rowCount)
            res.status(200).json({
                success: false,
                message:`Este departmento já está escalado nesse dia`,
            })

            else
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
}