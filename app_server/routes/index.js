var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');
var locationController = require('../controllers/location');
var reviewController = require('../controllers/review');
var aboutController = require('../controllers/about');

/* GET home page. */
router.get('/', indexController.index);
router.get('/location', locationController.location);
router.get('/location/review/new', reviewController.add);
router.get('/about', aboutController.about);

module.exports = router;
