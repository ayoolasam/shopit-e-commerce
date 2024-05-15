const express = require('express')
const userController =  require('../Controllers/authControllers.js') 
const router = express.Router();


router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/logout',userController.logoutUser)
router.post('/password/forgot',userController.forgotPassword)





module.exports = router




