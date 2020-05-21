const ModelPrimary = require('../models/Person');
const AccessModel = require('../models/Access');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const generateToken = (person_id, churc) => {
    return jwt.sign({
        person_id: person_id,
        churc_id: churc,
    }, process.env.PRIVATE_KEY_JWT,{
        expiresIn: 2592000
    })
}

module.exports = {
    async signin(req, res){
        try {
            const {mail, password} = req.body;
            const signin_person = await ModelPrimary.findAll({
                where:
                {
                    mail:mail
                },
                attributes:["id","churc"]
            })
            if(!signin_person.length)
            res.status(401).json({
                success: false,
                message: "CPF ou senha inválidos!"
            })

            const password_crypt = md5(password);
            const signin_access = await AccessModel.findAll({
                where:
                {
                    password_crypt:password_crypt
                }
            })
            if(!signin_access.length)
            res.status(401).json({
                success: false,
                message: "CPF ou senha inválidos!"
            })

            const {id:person_id, churc} = signin_person[0];
            const token = generateToken(person_id, churc);
            res.status(200).json({
                success: true,
                token: token
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                message:"E-mail ou senha inválidos",
                error: error.message
            })
        }
    },
    async registration(req, res){
        const {password, ...information_person} = req.body;
        try {
            const data = req.person_id === undefined ? information_person : Object.assign(information_person, {created_user: req.person_id})
            const response_person = await ModelPrimary.create(data)
            const {id:person_id, churc} = response_person.dataValues;

            const password_crypt = md5(password);
            await AccessModel.create({
                person: person_id,
                password_crypt: password_crypt,
            })

            const token = generateToken(person_id, churc);
            res.status(200).json({
                success: true,
                message:"Cadastro realizado com sucesso!",
                token: token
            }) 
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }
    }
}