const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema  = new  mongoose.Schema({
name:{
  type:String,
  reqired:[true,"please enter your name"],
  maxLength:[50,'your name can not exceed 50 characters']


},
email:{
  type:String,
  required:[true,"please enter your email"],
  unique:true,
},
password:{
  type:String,
  reqired:[true,"please enter your password"],
  minLength:[6,'your password must be more than 6 characters'],
  select:false
},
avatar:{
  public_id:String,
  url:String
},
role:{
  type:String,
  default:"user"
},
resetPasswordToken:{
  type:String
},
resetPasswordExpired:{
  type:Date
}



},
{timestamps:true}
);
//encrypting password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
    next();
}
this.password = await bcrypt.hash(this.password,10)
});
//generate tokens
userSchema.methods.getjwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_TIME
})
}
//compare userpassword
userSchema.methods.comparePassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)
}

//Genearte password reset token
userSchema.methods.getresetPasswordToken= function(){
const resetToken = crypto.randomBytes(20).toString('hex')


//Hash the token and set to rest token field
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

//set token expired time
this.resetPasswordExpired = Date.now()+ 30*60*1000

return resetToken;
}

const User = mongoose.model('User',userSchema)

module.exports = User