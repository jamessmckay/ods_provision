/* eslint-disable object-curly-spacing */
const Router = require('express-promise-router');
const provisionDatabase = require('../services/provisionDatabase');

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, template } = req.body;

    console.log(name, template);

    const result = await provisionDatabase(name, template);

    console.log(result);

    if (!result.success) {
      return res.status(result.statusCode).json({ msg: result.message });
    }

    res.status(201).send();
  } catch (err) {
    console.error(`Error while create database: ${err.message}`);
    next(err);
  }
});

module.exports = router;
