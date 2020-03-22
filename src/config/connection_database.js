const Mongoose = require('mongoose')
const ErroHandling = require('../utils/ErrorHandling')

try {
    Mongoose.connect(process.env.DATABASE_URL_MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch (error) {
    ErroHandling(error)
}

Mongoose.set('useCreateIndex', true);

module.exports = Mongoose;