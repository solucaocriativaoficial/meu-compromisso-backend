const Model = require('../models/CursoPregacao');

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
        })
    },
    searchName(req, res){
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
        })
    },
    insert(req, res){
        const {
            complete_name,
            city
        } = req.body;
        Model.create({
            complete_name: complete_name,
            city: city,
        })
        .then(content => {
            res.json({ message: 'Inscrição confirmada com com sucesso!', status: "ok" })
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Erro ao confirmar presença!", status: "erro", complete_erro: error})
        })
    },
    delete(req, res){
        Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Inscrição deletada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao deletar inscrição!", status: "erro", complete_erro: error})
        })
    },
    update(req, res){
        const {
            complete_name,
            city
        } = req.body;
        Model.update({
            complete_name: complete_name,
            city: city
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(content => {
            res.json({ message: 'Inscrição atualizada com sucesso!', status: "ok" })
        })
        .catch(error => {
            res.json({ message: "Erro ao atualizar inscrição!", status: "erro", complete_erro: error})
        })
    }
}