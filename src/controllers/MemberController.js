const Model = require('../models/Member');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    findAll(req, res){
        Model.find()
        .then(content => {
            if(content.length){
                res.status(200).json(content)
            }
            else{
                res.status(200).json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
        })
    },
    findReplace(req, res){
        Model.find()
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            error_handling.getError(error);
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
        })
    },
    findOne(req, res){
        Model.findOne({
            _id : req.params.id
        })
        .then(content => {
            if(content.length){
                res.status(200).json(content)
            }
            else{
                res.status(200).json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
        })
    },
    insert(req, res){
        const {
            complete_name,
            cpf,
            date_of_birth,
            contact_phone,
            mail,
            complete_address,
            created_user
        } = req.body;

        Model.findOne({
            cpf: cpf
        }, async (err, content) => {
            
            if(content)
            res.status(200).json({message: "Este CPF já está cadastrado!"})

            Model.create({
                complete_name: complete_name,
                cpf: cpf,
                date_of_birth: date_of_birth,
                contact_phone: contact_phone,
                mail: mail,
                complete_address: complete_address,
                created_at: Date.timestampCurrent(),
                created_user: created_user
            })
            .then(content => {
                res.status(200).json({ message: 'Membro cadastrado com sucesso!', status: "ok" })
            })
            .catch(error => {
                error_handling.getError(error);
                res.status(400).json({ message: "Erro ao cadastrar membro!", status: "erro", complete_erro: error})
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
    update(req, res){
        const {
            complete_name,
            cpf,
            date_of_birth,
            contact_phone,
            mail,
            complete_address,
            created_user
        } = req.body;
        console.log(req.body)

        Model.updateOne(
        { _id: req.params.id}, req.body )
        .then(result => {
            if(!result.nModified)
            res.status(400).json({ message: "Registro não foi atualizado!"})

            res.status(200).json({ message: "Registro atualizado com sucesso!"})
        })
        .catch(error => {
            error_handling.getError(error);
            res.status(400).json({ message: "Erro ao atualizar!", status: "erro", complete_erro:error })
        })
    }
}