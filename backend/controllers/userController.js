const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching profile" });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body, lastUpdated: new Date() };
    const user = await User.findByIdAndUpdate(
      req.user,
      updates,
      { new: true, runValidators: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating profile" });
  }
};