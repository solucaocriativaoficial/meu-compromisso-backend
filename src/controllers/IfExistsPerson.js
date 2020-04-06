const Model = require('../models/Person');

module.exports = {
    async CheckAuthentication(req, res){
        const userAgent = req.headers.auth;
        try {
            const ifExistsRegister = await Model.findById(userAgent, [])
            if(!ifExistsRegister)
            res.status(401).json({
                success: false,
                message: "Accesso negado! Usuário não existe no banco de dados!"
            })

        } catch(error) {
            ErrorHandling("busca em deletar", error.message);
            res.status(401).json({
                success: false,
                message: "Accesso negado! Problemas em reconhecer usuário!"
            })
        }
    },
}