const express = require('express');

const signupRouter = express.Router();
const debug = require('debug')('signupRouters');
const sql = require('mssql');

function router(nav) {
  signupRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();

      request.query('select * from Client')
        .then((result) => {
          debug(result);
          res.render(
            'signup',
            {
              nav
            }
          );
        });
    });

  signupRouter.route('/:id')
    .get((req, res) => {
      res.render(
        'signup',
        {
          nav
        }
      );
      res.send('Hello single signup.');
    });
  return signupRouter;
}

module.exports = router;
