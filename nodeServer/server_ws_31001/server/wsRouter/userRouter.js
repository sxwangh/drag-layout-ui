// serverRouter.js  commonjs
const express = require('express');
const expressWs = require('express-ws');

const router = express.Router();
expressWs(router);

router
  .ws('/user', (ws, req) => {
    const data1 = [{ name: '1586318224676', id: '123' }];
    const data2 = [{ name: '1586318224676', id: '123' }];
    const data3 = [{ name: '1586318224676', id: '123' }];
    // ws.send('user...');
    ws.send(JSON.stringify(data1));
    ws.send(JSON.stringify(data2));
    ws.send(JSON.stringify(data3));
    // setInterval(() => {
    //   ws.send('pang');
    // }, 2000);

    ws.on('message', (msg) => {
      console.log(`/user接到数据：${msg}`);
      console.log(req);
    });
    ws.on('close', () => {
      console.log('/user链接关闭');
      console.log(req);
    });
  });

module.exports = router;
