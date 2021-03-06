const Router = require('express-promise-router');
const router = new Router();
const vendorService = require('../services/vendor');
const { getContextFromRequest, generateKeySecret } = require('../helper');

router.get('/', async (req, res, next) => {
  try {
    const { application, instance } = getContextFromRequest(req);
    console.log(application, instance);

    const result = await vendorService.getVendors(application, instance);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:vendorid', async (req, res, next) => {
  try {
    const { application, instance } = getContextFromRequest(req);
    const { vendorid } = req.params;

    const result = await vendorService.getVendor(application, instance, vendorid);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {key, secret} = generateKeySecret(24, 48);
    res.status(201).json({key: key, secret: secret});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
