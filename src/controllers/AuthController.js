const Model = require('../models/Auth');
const ModelMember = require('../models/Member')
const bcrypt = require('bcrypt')
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    async auth(req, res){
        const {cpf} = req.body

        const content = await ModelMember.findOne({cpf: cpf},["_id"])

        if(!content)
        res.status(401).json({
            success: false,
            message: "CPF não encontrado!"
        })

        const {_id} = content

        const content_auth = await Model.findOne({member: _id}, ["password"])
        if(content_auth === null)
        res.status(401).json({
            success: false,
            message: "Usuário sem acesso! Por favor, faça seu cadastro!"
        })

        const check_password = bcrypt.compareSync(req.body.password, content_auth.password)
        if(!check_password)
        res.status(401).json({
            success: false,
            message: "Senha inválida!"
        })

        res.status(200).json({
            success: true,
            content: content._id
        })
    },
    async insert(req, res){
        const {
            member,
            password,
            privileges_m,
            created_user,
        } = req.body;

        const password_crypt = bcrypt.hashSync(password, 10)
        try {
            const content = await Model.findOne({member: member})

            if(content)
            res.status(401).json({
                success: false,
                message: "Estes membro já possui acesso!"
            })

            const check_created_user = created_user === undefined ? {} : {created_user: created_user}
            const join_data = Object.assign(
                {
                    member: member,
                    password: password_crypt,
                    privileges_m: privileges_m,
                    created_at: MyDate.timestampCurrent()
                },
                check_created_user
                )

            const content_create = Model.create(join_data)
            if(content_create)
            res.status(200).json({
                success: true,
                message: 'Cadastro realizado com sucesso!'
            })
            
        } catch (error) {
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar!"
            })
        }
    },
    delete(req, res){
        Model.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Registro deletado com sucesso!"
            })
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({
                success: false,
                message: "Erro ao deletar registro!"
            })
        })
    },
    async forgot_password_step1(req, res){
        try{
            const content = await ModelMember.findOne({cpf: req.body.cpf}, ["_id"])
            if(!content)
            res.status(401).json({
                success: false,
                message: "CPF não foi encontrado!"
            })

            res.status(200).json({
                success: true,
                content: content,
            })
        }
        catch(err){
            error_handling.getError(err);
            res.status(404).json({
                success: false,
                message: "Ocorreu um problema ao fazer busca pelo membro!"
            })
        }
    },
    async forgot_password_step2(req, res){
        const {_id, date_of_birth} = req.body
        try{
            const content = await ModelMember.findById(_id, "date_of_birth")
            if(!content)
            res.status(401).json({
                success: false,
                message: "Dados incorretos!"
            })

            if(content._doc.date_of_birth !== date_of_birth)
            res.status(401).json({
                success: false,
                message: "Data de nascimento incorreta!",
            })

            res.status(200).json({
                success: true,
                message: "ok"
            })
        }
        catch(err){
            error_handling.getError(err);
            res.status(404).json({
                success: false,
                message: "Ocorreu um problema ao atualizar a senha!"
            })
        }
    },
    async forgot_password_step3(req, res){
        const {member, new_password} = req.body
        const password_crypted = bcrypt.hashSync(new_password, 10)
        try{
            const content = await Model.updateOne({member: member}, {password: password_crypted})
            if(!content)
            res.status(401).json({
                success: false,
                message: "Não foi possível atualizar sua senha!"
            })

            res.status(200).json({
                success: true,
                message: "Senha atualizada com sucesso!",
            })
        }
        catch(err){
            error_handling.getError(err);
            res.status(404).json({
                success: false,
                message: "Ocorreu um problema ao atualizar senha!"
            })
        }
    },
    async replace_privileges(req, res){
        const {member, new_privileges_m} = req.body        
        try{
            const content = await Model.updateOne({member: member}, {privileges_m: new_privileges_m})
            if(!content)
            res.status(401).json({
                success: false,
                message: "Não foi possível trocar os privilégios deste membro!"
            })

            res.status(200).json({
                success: true,
                message: "Privilégio atualizado com sucesso!",
            })
        }
        catch(err){
            error_handling.getError(err);
            res.status(404).json({
                success: false,
                message: "Ocorreu um problema ao atualizar privilegios!"
            })
        }
    },
}