const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "unable to find token."
            });
        }
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unable to find token."
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(400).json({status:false, message: 'Token is not valid' });
        }
    } catch (error) {
       
        return res.status(401).json({
            success: false,
            message: "Something went wrong while fetching token"
        });
    }
};
