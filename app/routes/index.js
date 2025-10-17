var router = require('express').Router();
var indexController = require('../controllers/index');

router.get('/', indexController.home)

module.exports = router;