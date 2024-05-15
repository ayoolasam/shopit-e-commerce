const mongoose  = require("mongoose");
const Product = require("../Models/product");
const products = require('./data.js')




const seedProducts = async()=>{
  try{
    const uri = process.env.MONGO_DB


    mongoose.connect("mongodb+srv://obayomisamuel941:Ayosam2403@cluster0.iuubs1l.mongodb.net/ShopIT").then(()=>{
  console.log("connected to db")
})

await Product.deleteMany();
console.log('products are deleted')


await Product.insertMany(products)
console.log('products are inserted')


process.exit();
  }catch(err){
    console.log(err.message)
    process.exit();
  }

};


seedProducts();