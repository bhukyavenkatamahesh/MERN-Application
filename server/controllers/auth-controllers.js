const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page");
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const userCreated = await User.create({ username, email, password, phone });

    // Generate token asynchronously
    const token = await userCreated.generateToken();

    res.status(200).json({
      msg: "User registered successfully",
      token: token, // Send the generated token in the response
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while registering");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.json({ msg: "User Not found" });

    const user = await existingUser.comparePassword(password);

    if (user) {
      const token = await existingUser.generateToken();
      res.status(200).json({
        msg: "login Succesfuull",
        token: token,
        userId: existingUser._id.toString(),
      });
    }
  } catch (error) {
    res.status(400).json("Internal Sever Error");
  }
};

module.exports = { home, register, login };
