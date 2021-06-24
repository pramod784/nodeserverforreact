const express = require("express");
const router = express.Router();
const Models = require('../models');
const {USER_AUTH,HOME,API} = require('../controllers');

router.post('/register', USER_AUTH.RegisterUser);
router.post('/login', USER_AUTH.loginUser);
router.get('/v1/save/data', HOME.saveData);
router.get('/v1/get/chart/data', API.getData);

module.exports = router;
