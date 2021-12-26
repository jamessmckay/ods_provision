const Router = require('express-promise-router');
const router = new Router();
const {getProfiles, getProfileApplications} = require('../services/profile');
const {getContextFromRequest} = require('../helper');

router.get('/', async (req, res, next) => {
  try {
    const {application, instance} = getContextFromRequest(req);
    res.json(await getProfiles(application, instance, req.query.page));
  } catch (err) {
    console.error(`Error while getting profiles: ${err}`);
    next(err);
  };
});

router.get('/profileApplications', async (req, res, next) => {
  try {
    const {application, instance} = getContextFromRequest(req);
    res.json(await getProfileApplications(application, instance, req.query.page));
  } catch (err) {
    console.error(`Error while getting profiles: ${err}`);
    next(err);
  };
});

module.exports = router;
