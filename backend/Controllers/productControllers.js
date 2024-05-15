const express = require('express')
const Product = require('../Models/product.js')
const errorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const APIFilters = require('../utils/apiFilters.js')





//GETTING ALL PRODUCTS
exports.getProducts = catchAsyncErrors(async (req,res)=>{



  const apiFilters = new APIFilters(Product,req.query).search().filters()

 const resPerPage = 4
  let products = await apiFilters.query
  let filteredProductsCount = products.length
  
  apiFilters.pagination(resPerPage);
   products = await apiFilters.query.clone()
 console.log('req?.user',req?.user)
res.status(200).json({
 result: products.length,
  data:{
    resPerPage,
    filteredProductsCount,
    products
  },
message:"allProducts"

})
}
)

// Create new products => /api/v1/admin/products
exports.newProducts = catchAsyncErrors( async (req,res)=>{
  try{
//saved id of the user while  creating the product
    req.body.user = req.user._id

      const product = await Product.create(req.body)
      res.status(200).json({
        data:{
          product
        }
      })



  }catch(err){
    console.log(err)
    return res.status(400).json({
      err
    })
  }


}
)



//GET SINGLE PRODUCT DETAILS
exports.getProductDetails =  catchAsyncErrors(async(req,res,next)=>{
try{
        const product = await Product.findById(req.params.id)
        console.log(product)
        if(!product){
          return next(new errorHandler("products not found",404)) 
        }

        return res.status(201).json({
          product
        })
}catch(err){
  console.log(err)
  res.status(404).json({
    err
  })
}
}
)

//UPDATE PRODUCT DETAILS
exports.updateProduct =  catchAsyncErrors(async(req,res,next)=>{
try{


      let product = await Product.findById(req.params.id)

      if(!product){
        return next(new errorHandler("products not found",404)) 
      }


      product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
      })

      return res.status(201).json({
        message:"product updated"
      })

}catch(err){
  console.log(err)
  res.status(404).json({
    err
  })
}
}

)
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
  try{
  
  
        const product = await Product.findById(req.params.id)
  
        if(!product){
         return next(new errorHandler("products not found",404)) 
        }
  
  
        const deletedProduct = await Product.deleteOne(product)
  
        return res.status(201).json({
          message:"product deleted"
        })
  
  }catch(err){
    console.log(err)
    res.status(404).json({
      err
    })
  }
  }
)
