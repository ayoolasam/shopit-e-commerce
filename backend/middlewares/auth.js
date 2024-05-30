const express = require('express')
const catchAsyncErrors = require('./catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler.js')
const jwt = require('jsonwebtoken')
const User = require('../Models/user')

//checks if the user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
  
const {token}= req.cookies




if(!token){
  return  next(new ErrorHandler('login first to access this resource',401),)
}

  const decoded = jwt.verify(token,process.env.JWT_SECRET)



  req.user = await User.findById(decoded.id)



console.log(decoded)

next()
}) 



//Authorize user roles
exports.authorizeRoles = (...roles) =>{
  return (req,res,next) => {
    if(!roles.includes(req.user.role)) {
      return next(new ErrorHandler('role not authorized ',403),)
    }
  next()
  }
}