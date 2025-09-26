import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './Routes/user.route.js'; // Ensure path and name are correct

dotenv.config();

const app = express();
const PORT = 3000;
const URI = process.env.MONGODB_URI;

async function startserver() {
  try {
    await mongoose.connect(URI); // No options needed with latest mongoose
    console.log('mongodb is succesfully connected');
  } catch (error) {
    console.log('Error', error);
  }

  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.use('/signup', userRoute); // Mount your signup route

  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
}

startserver();
