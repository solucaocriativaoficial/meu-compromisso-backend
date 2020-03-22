const Model = require('../models/Auth');
const ModelMember = require('../models/Member')
const bcrypt = require('bcrypt')
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    auth(req, res){
        const {cpf, password} = req.body

        ModelMember.findOne({cpf: cpf},{_id}, (err, content) => {
            console.log(content)
            if(err)
            res.status(404).json({message: "Problemas na autenticação!"})

            if(!content)
            res.status(401).json({message: "CPF não encontrado!"})

            const {_id} = content

            Model.findOne({member: _id}, (err, content_auth) =>{
                const check_password = bcrypt.compareSync(password, content_auth.password)
                if(!check_password)
                res.status(401).json({message: "Senha inválida!"})

                res.status(200).json({token_access: content_auth.token_access})
            })

        })
    },
    insert(req, res){
        const {
            member,
            password,
            privileges_m
        } = req.body;

        const password_crypt = bcrypt.hashSync(password, 10)
        const token_access = bcrypt.hashSync(member, 15)

        Model.findOne({
            member: member
        }, async (err, content) => {

            if(err)
            res.status(404).json({message: "Problemas na verificação de existencia do membro!"})

            if(content)
            res.status(401).json({message: "Estes membro já possui acesso!"})

            Model.create({
                member: member,
                password: password_crypt,
                privileges_m: privileges_m,
                token_access: token_access,
                token_expired: MyDate.date_hashexpired,
                created_at: MyDate.timestampCurrent(),
                created_user: created_user
            })
            .then(content => {
                res.status(200).json({ message: 'Cadastro realizado com sucesso!', token: token_access})
            })
            .catch(error => {
                error_handling.getError(error);
                res.status(400).json({ message: "Erro ao cadastrar!"})
            })
        })
    },
    delete(req, res){
        Model.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({ message: "Registro deletado com sucesso!"})
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro ao deletar registro!"})
        })
    },
    update(req, res){
        Model.findById(req.params.id, "_id", (err, content) =>{
            if(err)
            res.status(404).json({message: "Ocorreu um problema ao fazer busca pelo membro!"})

            if(!content)
            res.status(401).json({message: "Registro inexistente!"})

            const token = content.token_expired < MyDate.dateCurrent ? {
                token_access: bcrypt.hashSync(member, 15),
                token_expired: MyDate.date_hashexpired
            } : {};

            const join_data = Object.assign(req.body, token, {modification_at: MyDate.date_hashexpired})

            Model.updateOne({_id: req.params.id},join_data)
            .then(result => {
                if(!result.nModified)
                res.status(400).json({ message: "Registro não foi atualizado!"})

                res.status(200).json({ message: "Registro atualizado com sucesso!"})
            })
            .catch(error => {
                error_handling.getError(error);
                res.status(400).json({ message: "Erro ao atualizar!", status: "erro", complete_erro:error })
            })
        })
    }
}