var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/usercontrollers');
const Auth = require('../middleware/auth');

router.post('/login', UsersControllers.LoginDetails);

router.post('/register', UsersControllers.RegisterDetails);

router.put('/password', Auth.AuthMiddleware, UsersControllers.Password);

router.post('/emailverfication', UsersControllers.EmailVerfication);

router.post('/verify', UsersControllers.VerficationCode);

module.exports = router;
