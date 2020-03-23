const Model = require('../models/Unity');
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    async findAll(req, res){
        const content = await Model.find();
        if(content.length)
        res.status(200).json({
            success: true,
            content: content
        })
        
        res.status(200).json({
            success: false,
            message: 'Nenhum registro encontrado'
        })
    },
    async filter(req, res){
        const query = req.query.find
        const search = new RegExp(query, "i")

        const content = await Model.find({name: search})
        
        if(content.length)
        res.status(200).json({
            success: true,
            content: content
        })

        res.status(200).json({
            success: false,
            message: 'Nenhum registro encontrado'
        })
            
    },
    async findOne(req, res){
        try {
            const content = await Model.findById(req.params.id)
            if(content)
            res.status(200).json({
                success: true,
                content: content
            })

            res.status(200).json({
                success: false,
                message: 'Nenhum registro encontrado'
            })
        } catch(error) {
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro ao fazer busca!"
            })
        }
    },
    async insert(req, res){
        const query = req.query.find
        try {
            const content = await Model.find({name: /query/i})
            if(content.length)
            res.status(401).json({
                success: true,
                message: "Já existe um registro com esse nome!"
            })
        } catch (error) {
            error_handling.getError(error);
            res.status(401).json({
                success: false,
                message: "Erro ao procurar o nome dessa associação!"
            })
        }

        const join_data = Object.assign(req.body, {
            created_at: MyDate.timestampCurrent()
        })
        try {
            const content = await Model.create(join_data)
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
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro em adicionar um novo registro!"
            })
        }
    },
    async delete(req, res){
        try {
            const ifExistsRegister = await Model.findById(req.params.id)

            if(!ifExistsRegister)
            res.status(401).json({
                success: false,
                message: "Não existe este código de associação!"
            })

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
                error_handling.getError(error);
                res.status(400).json({
                    success: false,
                    message: "Erro ao deletar registro!"
                })
            }
        } catch(error) {
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro ao verificar existencia do registro!"
            })
        }
    },
    async update(req, res){
        try {
            const content = await Model.updateOne({_id: req.params.id}, req.body)
            if(content.nModified)
            res.status(200).json({
                success: true,
                message: "Registro atualizado com sucesso!"
            })

            res.status(200).json({
                success: false,
                message: 'Não foi possível cadastrar!'
            })
        } catch(error) {
            console.log(error)
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro grave!"
            })
        }
        
    }
}