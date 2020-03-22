const Model = require('../models/Member');
const MyDate = require('../utils/MyDate');
const error_handling = require('../utils/ErrorHandling');
const ValidationFields = require('../utils/ValidationFields')

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
    filter(req, res){
        const query = req.query.find
        const search = new RegExp(query, "i")
        Model.find({
            complete_name: search,
        }, (err, content) =>{

            if(err){
                error_handling.getError(err);
                res.status(400).json({message: "Erro na consulta!"});
            }
            
            if(!content.length)
            res.status(200).json({ message: 'Nenhum registro encontrado'})

            res.status(200).json(content)
        })
    },
    findOne(req, res){
        Model.findById(req.params.id, (err, content) => {
            if(err){
                error_handling.getError(err);
                res.status(400).json({ message: "Erro na consulta!"})
            }

            if(content){
                res.status(200).json(content)
            }
            else{
                res.status(204).json({ message: 'Nenhum registro encontrado'})
            }
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
                res.status(200).json({ message: 'Cadastro realizado com sucesso!', status: "ok" })
            })
            .catch(error => {
                error_handling.getError(error);
                res.status(400).json({ message: "Erro ao cadastrar!", status: "erro", complete_erro: error})
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
        Model.findById(req.params.id, "_id", (err, content) =>{
            if(!content)
            res.status(400).json({message: "Registro inexistente!"})

            const { cpf, date_of_birth, mail} = req.body;
            //validations
            if(date_of_birth !== undefined && !ValidationFields.date_of_birth(date_of_birth))
            res.status(400).json({message: "Data de nascimento inválida!"})

            if(cpf !== undefined && !ValidationFields.cpf(cpf))
            res.status(400).json({message: "CPF inválido!"})

            if(mail !== undefined && !ValidationFields.mail(mail))
            res.status(400).json({message: "E-Mail inválido!"})

            Model.updateOne({_id: req.params.id},req.body)
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