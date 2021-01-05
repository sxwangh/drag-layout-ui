// npm i -S express express-ws
const express = require('express');

const history = require('./httpRouter/historyRouter.js');
const historyModule = require('./httpRouter/historyModuleRouter.js');

const app = express();

app.use('/', history);
app.use('/', historyModule);

app.listen(31003);
