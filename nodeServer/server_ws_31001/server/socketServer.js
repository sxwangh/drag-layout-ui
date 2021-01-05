// npm i -S express express-ws
const express = require('express');
const expressWs = require('express-ws');
const asr = require('./wsRouter/asrRouter.js');
const user = require('./wsRouter/userRouter.js');

const app = express();
expressWs(app);

app.use('/ws/assistant/vioce', asr);
app.use('/ws/assistant/vioce', user);

app.listen(31001);
