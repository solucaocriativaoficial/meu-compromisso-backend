const Model = require('../models/Member');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    findAll(req, res){
        Model.findAll()
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
            error_handling(status, error);
        })
    },
    timeline(req, res){
        Model.findAll({
            attributes: [
                'id',
                'complete_name',
                'image']
        })
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
            error_handling(status, error);s
        })
    },
    findOne(req, res){
        Model.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            if(content.length){
                res.json(content)
            }
            else{
                res.json({ message: 'Nenhum registro encontrado', status: "ok" })
            }
        })
        .catch(error => {
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error})
            error_handling(status, error);
        })
    },
    insert(req, res){
        const {
            complete_name,
            cpf,
            date_of_birth,
            contact_phone,
            mail,
            zipcode,
            address,
            neightborhood,
            references_address,
            city,
            state,
            country,
            created_user
        } = req.body;

        Model.create({
            complete_name: complete_name,
            cpf: cpf,
            date_of_birth: date_of_birth,
            contact_phone: contact_phone,
            mail: mail,
            zipcode: zipcode,
            address: address,
            neightborhood: neightborhood,
            references_address: references_address,
            city: city,
            state: state,
            country: country,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.json({ message: 'Membro cadastrado com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar membro!", status: "erro", complete_erro: error})
            error_handling(status, error);
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json({ message: "Membro deletado com sucesso!", status: "ok"})
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar", status: "erro", complete_erro: error })
            error_handling(status, error);
        })
    },
    update(req, res){
        const {
            complete_name,
            cpf,
            date_of_birth,
            contact_phone,
            mail,
            zipcode,
            address,
            neightborhood,
            references_address,
            city,
            state,
            country,
            updated_user
        } = req.body;

        Model.update({
            complete_name: complete_name,
            cpf: cpf,
            date_of_birth: date_of_birth,
            contact_phone: contact_phone,
            mail: mail,
            zipcode: zipcode,
            address: address,
            neightborhood: neightborhood,
            references_address: references_address,
            city: city,
            state: state,
            country: country,
            updated_at: Date.timestampCurrent(),
            updated_user: updated_user,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json({ message: "Atualizado com sucesso", status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar!", status: "erro", complete_erro:error })
            error_handling(status, error);
        })
    }
}