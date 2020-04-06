const Model = require('../models/District');
const PersonController = require('../controllers/PersonController');
const ErrorHandling = require('../utils/ErrorHandling');

module.exports = {
    async find(req, res){
        const filter = req.query.f === undefined ? '' : req.query.f;
        const filter_regExp = new RegExp(filter, 'i');
        try {
            const content = await Model.find({name: filter_regExp});
            if(content.length)
            res.status(200).json({
                success: true,
                content: content
            })
            
            res.status(200).json({
                success: false,
                message: 'Nenhum registro encontrado'
            })
        } catch (error) {
            ErrorHandling("find", error.message);
            res.status(404).json({
                success: false,
                message: 'Erro ao fazer pesquisa!'
            })
        }
    },
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
    async insert(req, res){
        try {
            const content = await Model.create(req.body)
            if(content)
            res.status(200).json({
                success: true,
                message: "Cadastro realizado com sucesso"
            })

            res.status(200).json({
                success: false,
                message: 'Não foi possível cadastrar!'
            })
                        
        } catch (error) {
            ErrorHandling("insert", error.message);
            res.status(400).json({
                success: false,
                message: "Erro em adicionar um novo registro!"
            })
        }
    },
    async delete(req, res){
        try{
            const content_delete = await Model.deleteOne({_id: req.params.id})
            if(content_delete)
            res.status(200).json({
                success: true,
                message: "Registro deletado com sucesso!"
            })                

            res.status(400).json({
                success: false,
                message: "Registro não foi deletado!"
            })
        }
        catch(error) {
            ErrorHandling("delete", error.message);
            res.status(400).json({
                success: false,
                message: "Erro ao deletar registro!"
            })
        }
    },
    async update(req, res){
        try{
            const content_delete = await Model.update({_id: req.params.id}, req.body)
            if(content_delete)
            res.status(200).json({
                success: true,
                message: "Registro atualizado com sucesso!"
            })                

            res.status(400).json({
                success: false,
                message: "Registro não foi atualizar!"
            })
        }
        catch(error) {
            ErrorHandling("delete", error.message);
            res.status(400).json({
                success: false,
                message: "Erro ao atualizar registro!"
            })
        }
    },
}