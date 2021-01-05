// serverRouter.js  commonjs
const express = require('express');
const expressWs = require('express-ws');

const router = express.Router();
expressWs(router);

router
  .get('/text/history', (req, resp) => {
    console.log(req);
    const data = {
      data: {},
      errorMessge: '成功',
      status: 200,
    };
    resp.send(JSON.stringify(data));
    console.log(resp);
  });

module.exports = router;
