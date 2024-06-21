const mongoose = require('mongoose')



const orderSchema = new mongoose.Schema({

shippingInfo :{
address:{
  type:String,
  required:true
},

city:{
  type:String,
  required:true
},
phone:{
  type:String,
  required:true
},
zipCode:{
  type:String,
  required:true
},
country:{
  type:String,
  required:true
},
},
user:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"User",
},
orderItems:[
  {
    name:{
      type:String,
      required:true
    },
      quantity:{
      type:Number,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    price:{
      type:String,
      required:true
    },
    product:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"Product",
    },
  },
],
paymentMethod:{
  type:String,
  required:[true,"please select a a payment method"],
  enum:{
    values:['COD','CARD'],
    message:'please select :COD or CARD'
  }
},
paymentInfo:{
  id:String,
  status:String,
  
},
itemsPrice:{
  type:Number,
  required:true,
},
taxAmount:{
  type:Number,
  required:true,
},
shippingAmount:{
  type:Number,
  required:true
},
totalAmount:{
  type:Number,
  required:true
},
orderStatus:{
  type:String,
default:'Processing',
enum:{
  values:['Processing','Shipped','Delivered'],
  message:'please select correct order status'
}
},
deliveredAt: Date
},
{timestamps:true}
)

const Order = mongoose.model('Order',orderSchema)
module.exports = Order