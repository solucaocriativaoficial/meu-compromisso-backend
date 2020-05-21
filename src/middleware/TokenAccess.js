const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.auth;
    if(token === undefined)
    res.status(401).json({
        success: false,
        message: "Ops! Você poderia, por favor, fazer o login novamente?"
    })

    jwt.verify(token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
        if(err)
        res.status(401).json({
            success: false,
            message: "Eita! Tente novamente, caso persista, feche e abra novamente a aplicação."
        });

        req.person_id = decoded.person_id;
        req.churc_id = decoded.churc_id;
        next();
    });
}