var express = require('express');
var router = express.Router();

const CarsControllers = require('../controllers/carscontrollers');
const Auth = require('../middleware/auth');

router.get('/list', Auth.AuthMiddleware, CarsControllers.CarsList);

router.get('/damagedashboard/:id', Auth.AuthMiddleware, CarsControllers.DamageDashboard);

router.get('/damagestatus/:id', Auth.AuthMiddleware, CarsControllers.DamageStatus);

router.post('/carkmstand', Auth.AuthMiddleware, CarsControllers.CarkmStand);

module.exports = router;
