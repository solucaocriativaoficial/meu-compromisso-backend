const Model = require('../models/Scale');
const ModelDepartment = require('../models/Department');
const ErrorHandling = require('../utils/ErrorHandling');

module.exports = {
    async findById(req, res, next){
        try {
            const ifExistsRegister = await Model.findById(req.params.id)
            if(!ifExistsRegister)
            res.status(401).json({
                success: false,
                message: "Código deste registro não foi encontrado!"
            })

            next();
        } catch(error) {
            ErrorHandling("busca em deletar", error.message);
            res.status(400).json({
                success: false,
                message: "Erro ao verificar existencia do registro!"
            })
        }
    },
    async checkIfScaled(req, res, next) {
        const {department} = req.body;
        if(department !== undefined)
        {
            const verifyIfadmin = await ModelDepartment.findById(department.department_id, "access_alter");
            if(!verifyIfadmin.access_alter)
            {
                res.status(401).json({
                    success: false,
                    message: `Ops! Você não é um administrador para alterar essa escala!`
                })
            }
        }

        try {            
            const check = await Model.find({  }, "_id scale_type churc");
    
            if(check)
            res.status(400).json({
                success: false,
                message: `Este membro já está escalado na igreja ${check.churc} nesse dia! Por favor, escolher outro membro!`
            })

            next();
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: `Estamos com problemas para verificar se o membro está escalado!`
            })
        }
   },
}