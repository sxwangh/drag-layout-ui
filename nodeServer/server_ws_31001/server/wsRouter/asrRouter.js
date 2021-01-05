// serverRouter.js  commonjs
const express = require('express');
const expressWs = require('express-ws');

const router = express.Router();
expressWs(router);

router
  .ws('/asr', (ws, req) => {
    const data1 = [{ name: '1586318224676', id: '123' }];
    const data2 = [{ name: '1586318224676', id: '123' }];
    const data3 = [{ name: '1586318224676', id: '123' }];
    // ws.send('asr..');
    ws.send(JSON.stringify(data1));
    ws.send(JSON.stringify(data2));
    ws.send(JSON.stringify(data3));
    // ws.send(JSON.stringify(data4));
    // ws.send(JSON.stringify(data5));
    // ws.send(JSON.stringify(data6));
    // ws.send(JSON.stringify(data7));
    // ws.send(JSON.stringify(data8));
    // ws.send(JSON.stringify(data9));
    // ws.send(JSON.stringify(data10));
    // ws.send(JSON.stringify(data11));
    // ws.send(JSON.stringify(data12));
    // ws.send(JSON.stringify(data13));

    setInterval(() => {
      ws.send('pang');
    }, 3000);
    // setTimeout(() => {
    //   ws.send(JSON.stringify({ stopws: '异常请关闭'}));
    // }, 8000);

    ws.on('message', (msg) => {
      console.log(`/asr接到数据：${msg}`);
      console.log(req);
    });
    ws.on('close', () => {
      console.log('/asr链接关闭');
      console.log(req);
    });
  });

module.exports = router;
