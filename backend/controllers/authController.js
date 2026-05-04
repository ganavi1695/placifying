const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, {
  expiresIn: "7d"
});

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  dob: user.dob,
  timeline: user.timeline,
  lastUpdated: user.lastUpdated
});



// REGISTER
exports.register = async (req, res) => {
  console.log('AUTHCONTROLLER REGISTER called');
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = createToken(user._id);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error("REGISTER ERROR", err);
    res.status(500).json({ msg: err.stack || err.message || "Error registering user" });
  }
};



// LOGIN
exports.login = async (req, res) => {
  console.log('AUTHCONTROLLER LOGIN called');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = createToken(user._id);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error("LOGIN ERROR", err);
    res.status(500).json({ msg: err.message || "Error logging in" });
  }
};

