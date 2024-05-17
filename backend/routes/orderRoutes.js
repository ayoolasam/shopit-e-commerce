const express = require('express')
const {newOrder,getOrder,myOrders} = require('../Controllers/orderControllers.js')
const router = express.Router();
const protectRoute = require('../middlewares/auth.js')


router.post('/new',protectRoute.isAuthenticatedUser,newOrder)
router.get('/order/:id',protectRoute.isAuthenticatedUser,getOrder)
router.get('/me/order',protectRoute.isAuthenticatedUser,myOrders)

module.exports = router