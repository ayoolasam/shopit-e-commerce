const express = require('express')
const app = express()
require('dotenv').config()
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes.js')
const  mongoose  = require('mongoose')
const errorMiddleware = require('../backend/middlewares/errors.js')
const authRoutes = require('./routes/authRoutes.js')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')


process.on('uncaughtException', (err)=>{
  console.log(`ERROR:${err}`)
  console.log("shtting down due uncaught exceptions")
  process.exit(1)


})
app.use(mongoSanitize())
app.use(express.json({limit:"20kb"}))
app.use(cookieParser())

const DB = process.env.MONGO_DB
mongoose.connect(DB).then(()=>{
  console.log("database Connected")
})


app.use('/api/v1/products',productRoutes)

app.use('/api/v1/users',authRoutes)
app.use('/api/v1/orders',orderRoutes)
  app.use(errorMiddleware )

  const server =   app.listen(process.env.PORT,()=>{
  console.log(`server running on port ${process.env.PORT}`)
})

process.on('unhandledRejection', (err)=>{
  console.log(`ERROR: ${err}`);
  console.log('Shutting down server due to unhandled Promise rejection')
  server.close(()=>{
    process.exit(1)
  })
})
