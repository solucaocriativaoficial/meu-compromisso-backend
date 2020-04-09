const Model = require('../models/Person');
const ModelChurc = require('../models/Churc');
const bcrypt = require('bcrypt');
const ErrorHandling = require('../utils/ErrorHandling');

module.exports = {
    async find(req, res){
        const content_churc_for_district = await ModelChurc.find({district: req.person_district}, "_id churc_name");
        if(!content_churc_for_district)
        res.status(200).json({
            success: false,
            message: 'Nenhuma igreja esta sendo encontrada com o seu distrito!'
        })

        const filterChurcs = ""

        const metodFilter = content_churc_for_district.reduce((filterChurcs, currentChurc) =>
        {
            const searchObject = {"churc": currentChurc._id}
            return `${filterChurcs},${currentChurc._id}`;
        });
        console.log(metodFilter)

        const filter = req.query.f === undefined ? '' : req.query.f;
        const filter_regExp = {name: new RegExp(filter, 'i')};

        const contentPerson = await Model.find()
        .where()
        if(!contentPerson.length)
        res.status(200).json({
            success: false,
            message: 'Nenhum registro encontrado'
        })
        
        res.status(200).json({
            success: true,
            content: contentPerson
        })
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
        const password_crypted = bcrypt.hashSync("123", 15);
        const join_data = Object.assign(req.body, {
            password: password_crypted,
            created_user: req.person_id,
        });
        try {
            const content = await Model.create(join_data);
            if(!content)
            res.status(200).json({
                success: false,
                message: 'Não foi possível cadastrar!'
            })


            res.status(200).json({
                success: true,
                message: `Cadastro realizado com sucesso! A senha padrão desse login é '123'. Por favor, peça a ${req.body.name} para alterar assim que ela fizer o primeiro acesso!`
            })
                        
        } catch (error) {
            ErrorHandling("insert", error.message);
            res.status(400).json({
                success: false,
                message:error.message
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
            const join_data = Object.assign(req.body, {updated_user: req.person_id});
            const content_delete = await Model.update({_id: req.params.id}, join_data);
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