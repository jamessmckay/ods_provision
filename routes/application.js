const Router = require('express-promise-router');
const router = new Router();
const {getApplications, getApplicationEducationOrganizations} = require('../services/application');
const {getContextFromRequest} = require('../helper');

router.get('/', async (req, res, next) => {
  try {
    const {application, instance} = getContextFromRequest(req);
    res.json(await getApplications(application, instance, req.query.page));
  } catch (err) {
    console.error(`Error while getting profiles: ${err}`);
    next(err);
  };
});

router.get('/educationOrganizations', async (req, res, next) => {
  try {
    const {application, instance} = getContextFromRequest(req);
    // const {applicationId} = req.params;
    res.json(await getApplicationEducationOrganizations(application, instance, 1));
  } catch (err) {
    console.error(`Error while getting education organiztaions: ${err}`);
    next(err);
  };
});

module.exports = router;
