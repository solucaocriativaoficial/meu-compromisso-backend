require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use(Routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor esta rodando');
})