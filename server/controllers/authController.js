import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password, experieneceLevel } = req.body;

    if (!username || !email || !password || !experieneceLevel) {
      return res.status(400).json({ message: 'All fields are required' });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        experieneceLevel,
      });
      res.status(201).json({ message: 'User registered successfully', user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };
