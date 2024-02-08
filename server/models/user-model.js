const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "YourSecretKeyHere", // Replace "YourSecretKeyHere" with your actual secret key
      { expiresIn: "30d" }
    );
    return token; // Return the token after signing
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to handle it later
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
