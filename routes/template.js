const express = require('express');
const router = express.Router();
const {getTemplates} = require('../services/db_template');

/* GET installed database templates listing. */
router.get('/', async (req, res, next) => {
  try {
    res.json(await getTemplates(req.query.page));
  } catch (err) {
    console.error(`Error while getting database templates `, err.message);
    next(err);
  }
});

module.exports = router;
