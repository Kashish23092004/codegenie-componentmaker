import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './Routes/user.route.js'; 
import corsMiddleware from './cors.js';

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

async function startserver() {
  try {
    await mongoose.connect(URI); 
    console.log('mongodb is succesfully connected');
  } catch (error) {
    console.log('Error', error);
  }

  app.use(corsMiddleware);
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.use('/signup', userRoute);

  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
}

startserver();
