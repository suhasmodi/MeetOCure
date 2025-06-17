const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



    const loginUser = async (req, res) => 
    {
        try 
        {
            const { email, password } = req.body;

            // Check for user
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

            const token = generateToken(user._id, user.role);

            res.json
            ({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        } 
        catch (err) 
        {
            res.status(500).json({ message: err.message });
        }
    };

    
    const generateToken = (id, role) => 
    {
        return jwt.sign({ id, role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
    });
};

    module.exports = {
    SignupUser,
    loginUser,
};
