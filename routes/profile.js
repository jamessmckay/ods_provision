const Router = require('express-promise-router');
const router = new Router();
const {getProfiles} = require('../services/profile');

router.get('/:application/:instance', async (req, res, next) => {
  const {application, instance} = req.params;
  try {
    res.json(await getProfiles(application, instance, req.query.page));
  } catch (err) {
    console.error(`Error while getting database templates `, err.message);
    next(err);
  }

});

module.exports = router;
