const { Pool, Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'meu_compromisso',
    password: 'p21s11b96'
});
client.connect()

module.exports = {
    test(req, res){
        const comand = "SELECT * FROM member";
        client
        .query(comand)
        .then(content => {
            const { rowCount, rows } = content;
            res.json({ row_count: rowCount, content: rows })
        })
        .catch(erro =>{
            res.json({message: "erro aqui", error: erro})
        })
    }
}