import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, experienceLevel } = req.body;

    if (!username || !email || !password || !experienceLevel) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      experienceLevel, // ✅ correct spelling
    });

    const token = generateToken(user._id); // ✅ return token on register too if you want

    res.status(201).json({ message: 'User registered successfully', token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email }); // ✅ add await

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // ✅ add await

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user._id); // ✅ pass user ID

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };
