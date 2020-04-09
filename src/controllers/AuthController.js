const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelPerson = require('../models/Person');
const ModelChurc = require('../models/Churc');

const generateToken = async (data) => {
    const {_id, name, churc} = data;
    const district = await ModelChurc.findById(churc, "district");

    return jwt.sign({
        person_id: _id,
        person_name: name,
        person_district: district._doc.district,
    }, process.env.TOKEN_SECRET,{
        expiresIn: 86400
    })
}

module.exports = {
    async SignIn(req, res){
        const {cpf, password} = req.body;
        const check_cpf = await ModelPerson.findOne({cpf: cpf}, "_id name churc").select("+password");
        if(!check_cpf)
            res.status(401).json({
                success: false,
                message: "CPF ou password inválidos!"
            });

        const {password: resp_password} = check_cpf;
        const check_password = bcrypt.compareSync(password, resp_password);
        if(!check_password)
            res.status(401).json({
                success: false,
                message: "CPF ou password inválidos!"
            });

        res.status(200).json({
            success: true,
            content: await generateToken(check_cpf)
        })
    },
    async Signout(req, res){
        const {password, ...rest} = req.body;
        const password_crypted = bcrypt.hashSync(password, 15);
        const join_data = Object.assign(rest, {password: password_crypted});
        try {
            const content = await Model.create(join_data);
            if(!content)
            res.status(200).json({
                success: false,
                message: 'Não foi possível cadastrar!'
            })


            res.status(200).json({
                success: true,
                message: "Cadastro realizado com sucesso",
                token: generateToken(content)
            })
                        
        } catch (error) {
            ErrorHandling("insert", error.message);
            res.status(400).json({
                success: false,
                message: "Erro em adicionar um novo registro!"
            })
        }
    }
}