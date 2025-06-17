const express = require('express');
const router = express.Router();
const protect = require("./middleware/authMiddleware"); 

const 
{
    SignupUser,
    loginUser,
} = require("../controllers/authController");

router.post('/signup', SignupUser);
router.post('/login', loginUser);

module.exports = router;