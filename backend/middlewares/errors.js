const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,res,next) => {
let error = {
  statusCode: err?.statusCode || 500,
  message:err.message || "internal Server error",
}


//handle invalid  mongoose ID error

if(err.name==='CastError'){
  const message =`Resource not found. Invalid: ${err?.path}`;
  error = new ErrorHandler(message,404)
}



//handle validation  error

if(err.name==='ValidationError'){
  const message = Object.values(err.errors).map((value)=> value.message)
  error = new ErrorHandler(message,400)
}

res.status(error.statusCode).json({
  message: error.message,
})

}