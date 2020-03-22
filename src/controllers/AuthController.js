const Model = require('../models/Auth');
const ModelMember = require('../models/Member')
const bcrypt = require('bcrypt')
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    auth(req, res){
        const {cpf} = req.body

        ModelMember.findOne({cpf: cpf},["_id"], (err, content) => {
            if(err)
            res.status(401).json({
                success: false,
                message: "Problemas na autenticação!"
            })

            if(!content)
            res.status(401).json({
                success: false,
                message: "CPF não encontrado!"
            })

            const {_id} = content

            Model.findOne({member: _id}, ["password"], (err_auth, content_auth) =>{
                if(err_auth)
                res.status(401).json({
                    success: false,
                    message: "Problemas na autenticação!"
                })

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
            })

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

        Model.findOne({
            member: member
        }, async (err, content) => {

            if(err)
            res.status(404).json({
                success: false,
                message: "Problemas na verificação de existencia do membro!"
            })

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

            Model.create(join_data)
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
        })
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
    update_password(req, res){
        ModelMember.findOne({
            _id: req.body.member
        }, "_id", (err, content) =>{
            if(err)
            res.status(404).json({
                success: false,
                message: "Ocorreu um problema ao fazer busca pelo membro!"
            })

            if(!content)
            res.status(401).json({
                success: false,
                message: "Registro inexistente!"
            })
            const join_data = Object.assign(req.body, {modification_at: MyDate.timestampCurrent})

            Model.updateOne({_id: req.params.id},join_data)
            .then(result => {
                if(!result.nModified)
                res.status(400).json({
                    success: false,
                    message: "Registro não foi atualizado!"
                })

                res.status(200).json({
                    success: true,
                    message: "Registro atualizado com sucesso!"
                })
            })
            .catch(error => {
                error_handling.getError(error);
                res.status(400).json({
                    success: false,
                    message: "Erro ao atualizar!"
                })
            })
        })
    }
}