const express = require('express')
const {newOrder,getOrder,myOrders,updateOrder,allorders} = require('../Controllers/orderControllers.js')
const router = express.Router();
const protectRoute = require('../middlewares/auth.js')


router.post('/new',protectRoute.isAuthenticatedUser,newOrder)
router.get('/order/:id',protectRoute.isAuthenticatedUser,getOrder)
router.get('/me/order',protectRoute.isAuthenticatedUser,myOrders)
router.put('/admin/0rders/:id',protectRoute.isAuthenticatedUser,protectRoute.authorizeRoles('admin'),updateOrder)
router.get('/admin/orders',protectRoute.isAuthenticatedUser,protectRoute.authorizeRoles('admin'),allorders)

module.exports = router