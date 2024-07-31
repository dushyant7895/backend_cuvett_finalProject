const newUserValidation = (req, res, next) => {
    const { username, email, password, confirmpassword } = req.body;
  
  
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({
        status:false,
        message: "All fields are required",
      });
    }
  
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!checkEmail.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Email is not valid",
      });
    }
    
  
    const checkUserName = /^[a-zA-Z0-9_]+$/;
    if (!checkUserName.test(username)) {
      return res.status(400).json({
        status: false,
        message: "Username must contain only letters, numbers, and underscores",
      });
    }
    
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]{5,}$/;
  
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 5 characters long, and contain at least one capital letter, one digit, and one special character.",
      });
    }
    
  
    if (password !== confirmpassword) {
      return res.status(400).json({
        status:false,
        message: "Passwords and confirm password should be same",
      });
    }
  
    next();
  };
  
  module.exports = newUserValidation;
  