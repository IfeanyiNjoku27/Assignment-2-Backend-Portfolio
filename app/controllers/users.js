const User = require('../models/users');

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

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Add new user
exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      id: user._id,
    });
  } catch (err) {
    next(err);
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
        message: 'User not updated. Are you sure it exists?',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
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

    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({
      success: true,
      message: 'User deleted successfully',
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
