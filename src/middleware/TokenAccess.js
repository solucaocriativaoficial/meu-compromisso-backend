const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.auth;
    if(token === undefined)
    res.status(401).json({
        success: false,
        message: "Ops! Nenhum token de autenticação está sendo informado! Você poderia, por favor, fazer o login novamente?"
    })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err)
        res.status(401).json({
            success: false,
            message: "Eita! O token informado está com um formato inválido. Tente novamente! Caso o erro continue, faça login novamente!"
        });

        req.person_id = decoded.person_id;
        next();
    });
}