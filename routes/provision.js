const Router = require('express-promise-router');
const {createDatabase} = require('../services/db');
const router = new Router();

router.post('/ods', async (req, res, next) => {
  try {
    const {name, template} = req.body;

    console.log(name, template);

    if (!name) {
      return res
          .status(400)
          .json({success: false, msg: 'must include the database name to be created'});
    } else if (!template) {
      return res
          .status(400)
          .json({success: false, msg: 'must include the database name to be created'});
    }

    const result = await createDatabase({name, template});

    console.log(result);

    res.status(201).send();
  } catch (err) {
    console.error(`Error while create database `, err.message);
    next(err);
  }
});

module.exports = router;
