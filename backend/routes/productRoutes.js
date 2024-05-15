const express = require('express')
const router = express.Router()

const productController = require('../Controllers/productControllers.js')
const protectRoute = require('../middlewares/auth.js')



router.get('/products',productController.getProducts)


router.post('/admin/products',protectRoute.isAuthenticatedUser,protectRoute.authorizeRoles('admin'),productController.newProducts)
router.get('/:id',productController.getProductDetails)
router.put('admin/products/:id',protectRoute.isAuthenticatedUser,protectRoute.authorizeRoles('admin'),productController.updateProduct)
router.delete('admin/products/:id',protectRoute.isAuthenticatedUser,protectRoute.authorizeRoles('admin'),productController.deleteProduct)


module.exports = router
