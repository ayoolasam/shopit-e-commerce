const Order = require('../Models/order.js')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const ErrorHandler = require('../utils/errorHandler.js')



//create new order => /api/v1/orders/new
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
  try{

        const { 
          orderItems,
          shippingInfo,
          itemsPrice,
          taxAmount,
          shippingAmount,
          totalAmount,
          paymentMethod,
          paymentInfo

        } = req.body

        const order = await Order.create({ orderItems,
          shippingInfo,
          itemsPrice,
          taxAmount,
          shippingAmount,
          totalAmount,
          paymentMethod,
          paymentInfo,
          user:req.user._id
        })


        res.status(200).json({
          message:"order was successfull",
          order
        })



  }catch(error){
  console.log(error)
  return res.status(404).json({
  message:{
      error
  }
})
}
})


//get current user orders  /api/v1/me/orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
try{

        const orders  = await Order.find({user:req.user._id})

if(!orders){
  return res.status(400).json({
    message:"order not found"
  })
}

        res.status(200).json({
          orders
        })






}catch(error){
  console.log(error)
  return res.status(404).json({
  message:{
      error
  }
})
}

})



//get a particular order details /api/v1/orders/:id
exports.getOrder = catchAsyncErrors(async(req,res,next)=>{
  try{
  
          const order = await Order.findById(req.params.id).populate("user",'name email')
  
  if(!order){
    return res.status(404).json({
      message:"order not found"
    })
  }
  
          res.status(200).json({
            order
          })
  
  
  
  
  
  
  }catch(error){
    console.log(error)
    return res.status(404).json({
    message:{
        error
    }
  })
  }
  
  })