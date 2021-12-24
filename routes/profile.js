const Router = require('express-promise-router');
const router = new Router();
const {getProfiles} = require('../services/profile');
const {getContextFromRequest} = require('../helper');

router.get('/', async (req, res, next) => {
  const {application, instance} = getContextFromRequest(req);
  try {
    res.json(await getProfiles(application, instance, req.query.page));
  } catch (err) {
    console.error(`Error while getting database templates `, err.message);
    next(err);
  };
});

module.exports = router;
