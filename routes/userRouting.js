const express = require('express');
const router = express.Router();
const { signUp, login, editUser, fetchUser } = require('../controllers/auth');
const newUserValidation = require('../middlewares/SignValidation');
const CheckLogin = require('../middlewares/loginValidation');
const checkUpdateUserDetails = require('../middlewares/EditUserValidation');

router.post('/signup', newUserValidation, signUp);
router.post('/login', CheckLogin, login);
router.put('/updateUser/:userId', checkUpdateUserDetails, editUser);
router.get('/userDetails/:id', fetchUser);

module.exports = router;
