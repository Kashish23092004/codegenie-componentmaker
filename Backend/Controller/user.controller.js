import User from '../Model/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      password: hashedPassword
    });
    await createdUser.save();
    res.status(201).json({ userId: createdUser._id, message: 'User successfully created' });
  } catch (err) {
    console.log("CRITICAL DB ERROR:", err); // <-- ADD THIS LINE
    res.status(500).json({ message: 'Server error', details: err.message }); // <-- UPDATE THIS LINE
  }
};
