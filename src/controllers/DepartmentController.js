const ModelPrimary = require('../models/Department');

module.exports = {
    async list(req, res){
        try {
            const response_list = await ModelPrimary.findAll()
            if(!response_list.length)
            res.status(200).json({
                success: false,
                message:"Nenhum registro encontrado!"
            })

            res.status(200).json({
                success: true,
                content:response_list,
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    },
    async insert(req, res){
        try {
            const data = Object.assign(req.body, {created_user: req.person_id})
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
            const data = Object.assign(req.body, {update_user: req.person_id})
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