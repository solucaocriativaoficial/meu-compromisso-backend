const ModelPrimary = require('../models/HandleScale');

module.exports = {
    async insert(req, res){
        try {
            const data = Object.assign(req.body)
            await ModelPrimary.create(data)
            res.status(200).json({
                success: true,
                message:"Cadastro realizado com sucesso!",
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
    async update(req, res){
        try {
            const data = Object.assign(req.body)
            await ModelPrimary.update(data, {
                where:{
                    id: req.params.id
                }
            })
            res.status(200).json({
                success: true,
                message:"Cadastro atualizado com sucesso!"
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
    async delete(req, res){
        try {
            await ModelPrimary.destroy({
                where:{
                    id: req.params.id
                }
            })
            res.status(200).json({
                success: true,
                message:"Cadastro deletado com sucesso!"
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
}