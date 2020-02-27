const Model = require('../models/Access');
const Date = require('../utils/Date');
const Errors = require('../utils/Errors');

module.exports = {
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
    insert(req, res) {
        Model.create({
            member: req.body.member,
            password_access: req.body.password,
            privileges_m: req.body.privileges,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
        })
            .then(() => {
                res.json({ message: "ok" })
            })
            .catch(reject => {
                const { name } = reject;
                res.json(Errors.errors(name));
                console.log(reject)
            })
    },
    delete(req, res) {
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.json({ message: 'ok' })
            })
            .catch(error => {
                res.json({ message: error })
            })
    },
    update(req, res) {
        Model.update({
            member: req.body.member,
            password: req.body.password,
            privileges: req.body.privileges,
            updated_at: Date.timestampCurrent(),
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