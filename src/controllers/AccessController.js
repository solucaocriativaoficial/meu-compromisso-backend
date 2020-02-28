const Model = require('../models/Access');
const Date = require('../utils/Date');
const error_handling = require('../utils/ErrorHandling');

module.exports = {
    insert(req, res) {
        const {
            member,
            password_access,
            privileges_m
        } = req.body;

        Model.create({
            member: member,
            password_access: password_access,
            privileges_m: privileges_m,
            created_at: Date.timestampCurrent(),
            updated_at: Date.timestampCurrent(),
        })
            .then(() => {
                res.json({ message: "Acesso cadastrado com sucesso!", status: "ok" })
            })
            .catch(error => {
                res.json({ message: "Erro ao cadastrar acesso!", status: "erro", complete_erro: error});
                error_handling(status, error);
            })
    },
    delete(req, res) {
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.json({ message: 'Acesso delete com sucesso!' })
            })
            .catch(error => {
                res.json({ message: "Erro ao deletar", status: "erro", complete_erro: error});
                error_handling(status, error);
            })
    },
    update_password(req, res) {
        const {
            password_access,
        } = req.body;

        Model.update({
            password_access: password_access,
            updated_at: Date.timestampCurrent(),
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(result => {
                res.json({ message: "Senha atualizada com sucesso!", status: "ok" })
            })
            .catch(error => {
                res.json({ message: "Erro ao atualizar senha!", status: "erro", complete_erro: error});
                error_handling(status, error);
            })
    },
    update_privileges(req, res) {
        const {
            privileges_m
        } = req.body;

        Model.update({
            privileges_m: privileges_m,
            updated_at: Date.timestampCurrent(),
        }, {
            where: {
                id: req.body.id
            }
        })
        .then(result => {
            res.json({ message: "Privilégios atualizados com sucesso!", status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar privilégios!", status: "erro", complete_erro: error});
            error_handling(status, error);
        })
    }
}