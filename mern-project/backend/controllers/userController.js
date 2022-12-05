const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please include all fields');
  }

  // 1.) Find if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 2.) Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3.) Create a User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    return res.status(201).json({
      status: 'success',
      message: 'registration successful',
      data: {
        id: user._id,
        name,
        email
      }
    });
  }

  res.status(400);
  throw new Error('Invalid user data');
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'login successful'
  });
});

module.exports = { registerUser, loginUser };
