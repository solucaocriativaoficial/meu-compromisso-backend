const ModelAuth = require('../models/Auth')
function Auth(req, res, next)
{
    ModelAuth.findOne(
        {token_access: req.body.token},
        "token_access token_expired",
        (err, content) => {
            
        }
    )
}
module.exports = Auth()