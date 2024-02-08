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
    if (userExist) return res.status(400).json({ msg: "user already exists" });

    const data = await User.create({ username, email, password, phone });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send("Error while registering");
  }
};

module.exports = { home, register };
