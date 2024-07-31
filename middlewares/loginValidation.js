

const CheckLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            status:false,
            message: 'Email and password are required',
        });
    }

    const checkEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!checkEmail.test(email)) {
        return res.status(401).json({
            status:false,
            message: 'Email is incorrect',
        });
    }

    next();
};

module.exports = CheckLogin;
