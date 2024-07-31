const checkUpdateUserDetails = (req, res, next) => {
  const { username, email, newpassword, oldpassword } = req.body;

  
  if (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: 'Email is not valid',
      });
    }
  }


  if (newpassword) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]{8,}$/;
    if (!passwordRegex.test(newpassword)) {
      return res.status(400).json({
        status: false,
        message: 'Password must be at least 8 characters long and contain at least one capital letter, one digit, and one special character.',
      });
    }

    if (oldpassword && newpassword === oldpassword) {
      return res.status(401).json({
        status: false,
        message: 'Current password and new password is same',
      });
    }
  }

  
  if (username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        status: false,
        message: 'Username must be at least 3 characters long and contain only letters, numbers, and underscores',
      });
    }
  }

  next();
};

module.exports = checkUpdateUserDetails;
