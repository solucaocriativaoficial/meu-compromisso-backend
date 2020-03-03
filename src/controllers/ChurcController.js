const Model = require('../models/Churc');
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
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
            error_handling.getError(error);
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
            res.json({ message: "Erro na consulta!", status: "erro", complete_erro: error});
            error_handling.getError(error);
        })
    },
    insert(req, res){
        const {
            name,
            front_image,
            zipcode,
            address,
            neightborhood,
            references_address,
            city,
            state,
            country,
            district,
            created_user
        } = req.body;
        Model.create({
            name: name,
            front_image: front_image,
            zipcode: zipcode,
            address: address,
            neightborhood: neightborhood,
            references_address: references_address,
            city: city,
            state: state,
            country: country,
            district: district,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: created_user
        })
        .then(content => {
            res.json({ message: 'Igreja cadastrada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao cadastrar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Igreja deletada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    },
    update(req, res){
        const {
            name,
            front_image,
            zipcode,
            address,
            neightborhood,
            references_address,
            city,
            state,
            country,
            district,
            updated_user
        } = req.body;
        Model.update({
            name: name,
            front_image: front_image,
            zipcode: zipcode,
            address: address,
            neightborhood: neightborhood,
            references_address: references_address,
            city: city,
            state: state,
            country: country,
            district: district,
            updated_at: Date.timestampCurrent(),
            updated_user: updated_user,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Igreja atualizada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar igreja!", status: "erro", complete_erro: error})
            error_handling.getError(error);
        })
    }
}