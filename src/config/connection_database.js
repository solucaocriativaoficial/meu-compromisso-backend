const Mongoose = require('mongoose')
const ErroHandling = require('../utils/ErrorHandling')

Mongoose.connect(process.env.DATABASE_URL_MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(error => {
    console.log("Erro ao tentar se conectar ao banco de dados!", error)
    //ErroHandling(error)
})

Mongoose.set('useCreateIndex', true);

module.exports = Mongoose;