const User = require("../models/users");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAll = async (req, res, next) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Add new user
exports.create = async (req, res, next) => {
  try {
    console.log("Creating user: ", req.body.email);

    if (req.body.password) {
      req.body.password = await bycrypt.hash(req.body.password, 10);
    }
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      id: user._id,
    });
  } catch (err) {
    next(err);
  }
};

// Sign in
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ sucess: false, message: "Auth Failed. User not found" });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ sucess: false, message: "Auth failed. Wrong password" });
    }

    const token = jwt.signin(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Auth Sucessful",
      token: token,
      user: { id: user._id, name: user.firstname },
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
exports.update = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not updated. Are you sure it exists?",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

// Remove user by ID
exports.delete = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Remove all users
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await User.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} users` });
  } catch (err) {
    next(err);
  }
};
