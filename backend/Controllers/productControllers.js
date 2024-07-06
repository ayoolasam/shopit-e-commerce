const express = require('express')
const Product = require('../Models/product.js')
const errorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const APIFilters = require('../utils/apiFilters.js')
const mongoose = require('mongoose')
// const ErrorHandler = require('../utils/errorHandler')





//GETTING ALL PRODUCTS
exports.getProducts = catchAsyncErrors(async (req,res,next)=>{


  const apiFilters = new APIFilters(Product,req.query).search().filters()

  const resPerPage = 4
  let products = await apiFilters.query
  let filteredProductsCount = products.length
  
  


  
  apiFilters.pagination(resPerPage);
products = await apiFilters.query.clone()



res.status(200).json({
  result: products.length,
  
    resPerPage,
    filteredProductsCount,
    products,
  
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
        const product = await Product.findById(req.params.id).populate("reviews.user")
       
        if(!product){
          return next(new errorHandler("products not found",404)) 
        }

    res.status(200).json({
        success:true,  
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

//delete product
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





//create review //create/update product review  path=/ap1/v1/reviews
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
  try{

        const {rating,comment,productId} = req.body

        const review = {
          user:req?.user?._id,
          ratings:Number(rating),
          comment

        }
  
        const product = await Product.findById(productId)
  
        if(!product){
        return next(new errorHandler("products not found",404)) 
        }
  
  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

      if(isReviewed){
      product.reviews.forEach((review) => {
        if(review?.user?.toString() === req?.user?._id.toString())
          review.comment = comment
          review.rating = rating
      })
      } else {
product.reviews.push(review)
product.numOfReviews = product.reviews.length

      }


product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.length;

await product.save({validateBeforeSave:false})

        res.status(200).json({
        success:true 
        })
  
  }catch(err){
    console.log(err)
    res.status(404).json({
      err
    })
  }
  }
)



// get all reviews  path=/ap1/v1/reviews get route
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
  try{
  
    
  const product = await Product.findById(req.params.id)
      
  if(!product){
    return next(new errorHandler("products not found",404)) 
    }

    res.status(200).json({
      reviews:product.reviews
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      err
    })
  }
  }
)





// delete review  path=/ap1/v1/reviews
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
  try{

      
  
        const product = await Product.findById(req.query.productId)
  
        if(!product){
        return next(new errorHandler("products not found",404)) 
        }
  
  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?._id.toString()
  );

    
  product.numOfReviews = product.reviews.length


  product.ratings = 
product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.numOfReviews.length;

await product.save({validateBeforeSave:false});

        res.status(200).json({
        success:true 
        })
  
  }catch(err){
    console.log(err)
    res.status(404).json({
      err
    })
  }
  }
)