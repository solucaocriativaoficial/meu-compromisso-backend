const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes);

app.listen(3000, () => {
    console.log('Servidor esta rodando');
})