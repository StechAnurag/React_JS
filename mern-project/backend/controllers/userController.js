const asyncHandler = require('express-async-handler');
// @desc    Register a new user
// @route   /api/users/register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // return res.status(400).json({
    //   status: 'failed',
    //   message: 'please include all fields'
    // });

    res.status(400);
    throw new Error('please include all fields');
  }
  res.status(200).json({
    status: 'success',
    message: 'registration successful'
  });
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
