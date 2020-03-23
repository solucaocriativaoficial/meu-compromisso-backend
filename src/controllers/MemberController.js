const Model = require('../models/Member');
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');
const ValidationFields = require('../utils/ValidationFields')

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

        const content = await Model.find({complete_name: search})
        
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
        const {
            complete_name,
            cpf,
            date_of_birth,
            contact_phone,
            mail,
            complete_address,
            created_user
        } = req.body;

        const check_cpf = await Model.findOne({cpf: cpf})
            
        if(check_cpf)
        res.status(200).json({message: "Este CPF já está cadastrado!"})

        //validations
        if(!ValidationFields.date_of_birth(date_of_birth))
        res.status(204).json({message: "Data de nascimento inválida!"})

        if(!ValidationFields.cpf(cpf))
        res.status(204).json({message: "CPF inválido!"})

        if(!ValidationFields.mail(mail))
        res.status(204).json({message: "E-Mail inválido!"})

        Model.create({
            complete_name: complete_name,
            cpf: cpf,
            date_of_birth: date_of_birth,
            contact_phone: contact_phone,
            mail: mail,
            complete_address: complete_address,
            created_at: MyDate.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.status(200).json({
                success: true,
                message: 'Cadastro realizado com sucesso!'
            })
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar!"
            })
        })
    },
    delete(req, res){
        Model.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({ message: "Membro deletado com sucesso!"})
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro ao deletar", status: "erro", complete_erro: error })
        })
    },
    async update(req, res){
        const { cpf, date_of_birth, mail} = req.body;

        const content_find = await Model.findById(req.params.id, "_id")
        if(!content_find)
        res.status(400).json({message: "Registro inexistente!"})

        //validations
        if(date_of_birth !== undefined && !ValidationFields.date_of_birth(date_of_birth))
        res.status(400).json({message: "Data de nascimento inválida!"})

        if(cpf !== undefined && !ValidationFields.cpf(cpf))
        res.status(400).json({message: "CPF inválido!"})

        if(mail !== undefined && !ValidationFields.mail(mail))
        res.status(400).json({message: "E-Mail inválido!"})

        const content = await Model.updateOne({_id: req.params.id},req.body)
        if(!content.nModified)
        res.status(400).json({ message: "Registro não foi atualizado!"})

        res.status(200).json({ message: "Registro atualizado com sucesso!"})
    }
}