import User from '../Model/user.model.js'; 

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email }); 
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const createdUser = new User({
        fullname,
        email,
        password
      });

      await createdUser.save();

      res.status(201).json({ message: 'User successfully created' });
    }
  } catch (error) {
    console.log('Error', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
