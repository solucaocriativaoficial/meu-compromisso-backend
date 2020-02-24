const Member = require('../models/Member');
const Date = require('../utils/Date');

module.exports = {
    findAll(req, res){
        Member.findAll()
        .then(content => {
            res.json(content)
        })
    },
    insert(req, res){
        Member.create({
            complete_name: req.body.complete_name,
            cpf: req.body.cpf,
            date_of_birth: req.body.date_of_birth,
            contact_phone: req.body.contact_phone,
            mail: req.body.mail,
            createdAt: Date.timestampCurrent(),
            updatedAt: Date.timestampCurrent(),
        })
        .then(resolve => {
            res.json({ message: "Cadastrado com sucesso!" })
        })
        .catch( reject => {
            res.json(
                { message: reject + " Não foi possível cadastrar" , data: Date.timestampCurrent()}
                )
        })
    }   
}