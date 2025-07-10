import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  try {
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', (req, res) => {
  try {
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
