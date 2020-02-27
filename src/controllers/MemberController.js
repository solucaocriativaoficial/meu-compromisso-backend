const {Op} = require('sequelize');
const Model = require('../models/Member');
const Date = require('../utils/Date');
const Errors = require('../utils/Errors');

module.exports = {
    findAll(req, res){
        Model.findAll()
        .then(content => {
            res.json(content)
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
            res.json(content)
        })
        .catch(error => {
            res.json({  message: error })
        })
    },
    findOne(req, res){
        Model.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json(content)
        })
    },
    insert(req, res){
        Model.create({
            complete_name: req.body.complete_name,
            cpf: req.body.cpf,
            date_of_birth: req.body.date_of_birth,
            contact_phone: req.body.contact_phone,
            mail: req.body.mail,
            zipcode: req.body.zipcode,
            address: req.body.address,
            neightborhood: req.body.neightborhood,
            references_address: req.body.references_address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
            created_user: req.body.created_user
        })
        .then(() => {
            res.json({ message: "ok" })
        })
        .catch( reject => {
            res.json(reject);
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json({ message: "ok"})
        })
        .catch(error => {
            res.json({ message: error })
        })
    },
    update(req, res){
        Model.update({
            complete_name: req.body.complete_name,
            cpf: req.body.cpf,
            date_of_birth: req.body.date_of_birth,
            contact_phone: req.body.contact_phone,
            mail: req.body.mail,
            zipcode: req.body.zipcode,
            address: req.body.address,
            neightborhood: req.body.neightborhood,
            references_address: req.body.references_address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            updated_at: Date.timestampCurrent(),
            updated_user: req.body.updated_user,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.json({ message: "ok" })
        })
        .catch(error => {
            res.json({ message: error })
        })
    }
}