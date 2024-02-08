const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const {
  validate,
  validateSignIn,
} = require("../middlewares/validate-middleware");
const { signupSchema, signInSchema } = require("../validator/auth-validator");

router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router
  .route("/login")
  .post(validateSignIn(signInSchema), authControllers.login); // Use validateSignIn middleware for login route

module.exports = router;
