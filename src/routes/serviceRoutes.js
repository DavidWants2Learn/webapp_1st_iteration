const express = require('express');

const serviceRouter = express.Router();
const debug = require('debug')('serviceRouters');
const sql = require('mssql');

function router(nav) {
  serviceRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();

      request.query('select * from Client')
        .then((result) => {
          debug(result);
          res.render(
            'services',
            {
              nav
            }
          );
        });
    });

  serviceRouter.route('/:id')
    .get((req, res) => {
      res.render(
        'services',
        {
          nav
        }
      );
      res.send('Hello single service.');
    });
  return serviceRouter;
}

module.exports = router;
