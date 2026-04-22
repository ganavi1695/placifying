const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user,
    req.body,
    { new: true }
  );
  res.json(user);
};