const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes);

app.listen(3000, () => {
    console.log('Servidor esta rodando');
})