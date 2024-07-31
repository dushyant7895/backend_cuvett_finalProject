const User = require("../Models/UserModel"); // Correct model import path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (user) {
        return res.status(401).json({
          status: false,
          message: "User already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const createUser = new User({
        username,
        email,
        password: hashedPassword,
        
      });
  
      await createUser.save();
  
      const token = jwt.sign({ userId: createUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({
        success: true,
        message: "User registered successfully.",
        token,
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Something went worng in the server",
      });
    }
  };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await User.findOne({ email });
        if (!checkEmail) {
          return res.status(401).json({
            status:false,
             message: "User is not registered" 
            });
        }

        const check = await bcrypt.compare(password, checkEmail.password);
        if (!check) {
          return res.status(400).json({
            status:false,
             message: "Password is incorrect" });
        }

        const token = jwt.sign(
            { userId: checkEmail._id },
            process.env.JWT_SECRET,
            { expiresIn: '23h' }
        );

        res.status(201).json({
            success: true,
            message: "Login Sucessfully",
            token,
            user: checkEmail._id  // Include the user ID in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          success:false,
           message: "Something went wrong when login" });
      }
};

exports.fetchUser = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.status(400).json({
              success: false,
              message: "User ID is required",
          });
      }
      const userDetails = await User.findById(id);
      if (!userDetails) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }
      return res.status(200).json({
          success: true,
          userDetails,
          message: "User details fetched successfully",
      });
  } catch (error) {
     
      return res.status(500).json({
          success: false,
          message: "Error fetching user details",
      });
  }
};

exports.editUser = async (req, res) => {
     
    try {
      const { userId } = req.params;
      const { username, email, newpassword, oldpassword } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (oldpassword && newpassword) {
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Old password is not correct" });
        }
        user.password = await bcrypt.hash(newpassword, 12);
      }
  
      if (username) user.username = username;
      if (email) user.email = email;
  
      await user.save();
  
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  


  

 