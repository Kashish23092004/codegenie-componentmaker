import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,  
    required: true,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
  },
  password: {
    type: String,  
    required: true,
    // FIXED: Removed unique: true from password
  }
});

const User = mongoose.model('User', userSchema);

export default User;