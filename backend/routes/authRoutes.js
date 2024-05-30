const express = require("express");
const userController = require("../Controllers/authControllers.js");
const router = express.Router();
const protectRoute = require("../middlewares/auth.js");

//Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/password/forgot", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.get("/me", protectRoute.isAuthenticatedUser, userController.userProfile);
router.put(
  "/password/update",
  protectRoute.isAuthenticatedUser,
  userController.updatePassword
);
router.put(
  "/me/update",
  protectRoute.isAuthenticatedUser,
  userController.updateUserDetails
);
router.get(
  "/admin/users",
  protectRoute.isAuthenticatedUser,
  protectRoute.authorizeRoles("admin"),
  userController.getAllUsers
);
router.get(
  "/admin/users/:id",
  protectRoute.isAuthenticatedUser,
  protectRoute.authorizeRoles("admin"),
  userController.getuserDetails
);
router.put(
  "/admin/users/:id",
  protectRoute.isAuthenticatedUser,
  protectRoute.authorizeRoles("admin"),
  userController.updateUserDetailsAdmin
);
router.delete(
  "/admin/users/:id",
  protectRoute.isAuthenticatedUser,
  protectRoute.authorizeRoles("admin"),
  userController.deleteUsers
);

module.exports = router;
