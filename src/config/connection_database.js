const Mongoose = require('mongoose');
try {
    Mongoose.connect(process.env.DATABASE_URL_MONGO,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    Mongoose.set('useCreateIndex', true);
} catch (err) {
    console.log('Erro ao conectar com o banco de dados', err)
}

module.exports = Mongoose;