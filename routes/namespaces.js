const Router = require('express-promise-router');
const router = new Router();
const vendorService = require('../services/vendor');
const {getContextFromRequest} = require('../helper');

router.get('/:vendorid', async (req, res, next) => {
  try {
    console.log('here');
    const {application, instance} = getContextFromRequest(req);
    const { vendorid } = req.params;

    const result = await vendorService.getVendorNamespaces(application, instance, vendorid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
