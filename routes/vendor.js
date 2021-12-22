const Router = require('express-promise-router');
const router = new Router();

router.get('/', async (req, res, next) => {
  res.status(200).json({msg: 'vendors api'});
});

module.exports = router;
