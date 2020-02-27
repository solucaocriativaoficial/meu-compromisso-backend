const Model = require('../models/Login');

module.exports = {
    validation(req, res){
        Model.findAll({
            where: {
                cpf: req.body.cpf,
                password_access: req.body.password_access
            }
        })
        .then(content => {
            res.json(content)
        })
    }
}