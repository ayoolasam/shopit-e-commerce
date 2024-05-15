const User = require('../Models/user.js')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const ErrorHandler = require('../utils/errorHandler.js')
const sendToken = require('../utils/sendToken.js')
const {resetPasswordTemplate} = require('../utils/emailTemplates.js')
const sendEmail = require('../utils/sendEmail.js')





//Register User => /api/v1/users/register(post)
exports.registerUser = catchAsyncErrors(async(req,res)=>{
  try{
      const {name,email,password,role} = req.body

      const user = await User.create({
        name,
        email,
        password,
        role
      })

      sendToken(user,201,res) 

  }catch(err){
    console.log(err)
    return res.status(404).json({
  
    })
  }
})



//Login User => /api/v1/users/login(post)
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
  try{

      const {email,password} = req.body

      if(!email || !password){
        return next(new ErrorHandler('please enter email $ password',400),)
      }


      //Find user in the database

      const user = await User.findOne({email}).select('+password')


      if(!user){
        return next(new ErrorHandler('invalid email or password',401),)
      }
        
//check if password is correct

const isPasswordValid = await user.comparePassword(password)

if(!isPasswordValid){
  return next(new ErrorHandler('invalid  password',401),)
}



sendToken(user,201,res) 
  }catch(error){
    console.log(err)
    return res.status(404).json({
    message:{
      error
    }
    })
  }
})
//Log out User and clear cookie
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
try{

        res.cookie('token',null, {
          expires:new Date (Date.now()),
          httpOnly:true
        })
        res.status(200).json({
          message:"Logged out"
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


exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
  try{

  const {email} = req.body

    const user = await User.findOne({email})



      if(!user){
        return next(new ErrorHandler('user not found in the database',404),)
      }
        
//get resetPassword token

const resetToken  = user.getresetPasswordToken()
await user.save();


//create resetPassword url 
const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`

const message = resetPasswordTemplate(user?.name,resetUrl)


try{
await sendEmail({
  email:user.email,
  subject:"shopit password recovery",
  message
})


  return res.status(201).json({
  message:`email sent to ${user.email}`
})
}catch(err){
  console.log(err)
  user.resetPasswordToken = undefined
  user.resetPasswordExpired = undefined
  await user.save()
  
  return next(new ErrorHandler('error sending email',500),)
}

sendToken(user,201,res) 

  }catch(error){
    console.log(error)
    return res.status(404).json({
    message:{
      error
    }
    })
  }
})