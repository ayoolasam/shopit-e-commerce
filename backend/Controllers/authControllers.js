const User = require("../Models/user.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/sendToken.js");
const { resetPasswordTemplate } = require("../utils/emailTemplates.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

//Register User => /api/v1/users/register(post)
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return next(new ErrorHandler("user already found", 400));
    }

    if (password.length < 6) {
      return next(
        new ErrorHandler("passsword should be more than 6 characters", 400)
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    sendToken(user, 201, res);
  } catch (err) {
    console.log(err);
    return res.status(404).json({});
  }
});

//Login User => /api/v1/users/login(post)
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter email $ password", 400));
  }

  //Find user in the database

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = next(new ErrorHandler("invalid email or password", 401));

    return error;
  }

  //check if password is correct

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(new ErrorHandler("invalid  password", 401));
  }

  sendToken(user, 201, res);

  // }catch(err){
  //   console.log(err)
  //   return res.status(404).json({
  //   message:{
  //     err
  //   }
  //   })
  // }
});

//Log out User and clear cookie
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      message: "Logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//forgot password functionality
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("user not found in the database", 404));
    }

    //get resetPassword token

    const resetToken = user.getresetPasswordToken();
    await user.save();

    //create resetPassword url
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

    const message = resetPasswordTemplate(user?.name, resetUrl);

    try {
      await sendEmail({
        email: user.email,
        subject: "shopit password recovery",
        message,
      });

      return res.status(201).json({
        message: `email sent to ${user.email}`,
      });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpired = undefined;
      await user.save();

      return next(new ErrorHandler("error sending email", 500));
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//Reset password functionality
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    //hash the url token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpired: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "password reset token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("password and confirm password are not the same", 404)
      );
    }

    //set the new password

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//get current user profile /api/v1/me
exports.userProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);

    res.status(200).json({
      message: "successful",

      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//update user password /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id).select("+password");

    if (!user) {
      return res.status(200).json({
        message: "user not found",
      });
    }

    //check the previous user password ;

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("old password is incorrect", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      message: "successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//update userDetails  /api/v1/me/update
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
    });

if(!user){
  return next(new ErrorHandler("not correct", 400));
}

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//get all users in database  /api/v1/users/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find();
    const amountOfUsers = users.length;
    res.status(200).json({
      amountOfUsers,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//get a particular user  /api/v1/users/admin/users/:id
exports.getuserDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`user not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

// update user details for the admin  api/v1/users/admin/users/:id
exports.updateUserDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});

//delete a user admin api/v1/users/admin/users/:id
exports.deleteUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`user not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      message: "deleted sucessfull",
    });

    await user.deleteOne();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: {
        error,
      },
    });
  }
});
