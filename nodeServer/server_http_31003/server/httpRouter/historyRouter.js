// serverRouter.js  commonjs
const express = require('express');
const expressWs = require('express-ws');

const router = express.Router();
expressWs(router);

router
  .get('/history/assistant', (req, resp) => {
    console.log(req);
    const data = {
      data1: 'HI',
    };
    resp.send(JSON.stringify(data));
    console.log(resp);
  });

module.exports = router;
