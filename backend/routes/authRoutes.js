const express = require('express')
// router object
const router = express.Router();
const authController = require("../controllers/authController")

router.post('/register',authController.Register);
router.post('/login',authController.Login);
router.post('/google-login',authController.GoogleLogin)

module.exports = router;