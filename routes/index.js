var express = require('express');
var router = express.Router();

const Bankverbindungen = require('../controllers/Bankverbindungencontrollers');

router.get('/list', Bankverbindungen.getBankverbindungen);

router.post('/add', Bankverbindungen.AddBankverbindungen);

module.exports = router;
