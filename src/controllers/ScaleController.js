const Model = require('../models/Scale');
const ModelDepartment = require('../models/Department');
const ErrorHandling = require('../utils/ErrorHandling');

module.exports = {
    async find(req, res){
        try {
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
        } catch (error) {
            ErrorHandling("find", error.message);
            res.status(404).json({
                success: false,
                message: 'Erro ao fazer pesquisa!'
            })
        }
    },
    async myScale(req, res){
        try {
            const content = await Model.find({ "member.member_id": req.person_id })
            if(!content.length)
            res.status(401).json({
                success: false,
                message: "Você não está escalado em nenhuma igreja!"
            })

            res.status(200).json({
                success: true,
                content: content
            })

        } catch(error) {
            ErrorHandling("busca em deletar", error.message);
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    async departmentScale(req, res){
        try {
            const departmentsForPerson = await ModelDepartment.find({person_id: req.person_id}, "_id name_department")
            const filterDepartmentsForMe = departmentsForPerson.map(dep =>{
                return {"department.department_id": dep._id}
            })

            const content = await Model.find({ $or: filterDepartmentsForMe })
            if(!content.length)
            res.status(401).json({
                success: false,
                message: "Você não está escalado em nenhuma igreja!"
            })

            res.status(200).json({
                success: true,
                content: content
            })

        } catch(error) {
            ErrorHandling("busca em deletar", error.message);
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    async insert(req, res){
        const join_data = Object.assign(req.body, {created_user: req.person_id});
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
        const join_data = Object.assign(req.body, {updated_user: req.person_id});
        try{
            const content_delete = await Model.update({_id: req.params.id}, join_data)
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