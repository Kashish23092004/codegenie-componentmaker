import User from './Model/user.model.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // For simplicity, just return user id (in production use JWT)
    res.status(200).json({ userId: user._id, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
