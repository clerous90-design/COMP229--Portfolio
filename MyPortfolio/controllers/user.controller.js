const User = require('../models/User');

exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error retrieving users." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user." });
  }
};

exports.create = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating user." });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updated: Date.now() }, 
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found." });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user." });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found." });
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete user." });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all users." });
  }
};