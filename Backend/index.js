import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './Routes/user.route.js'; 
import cors from 'cors'; // Import cors directly here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

// The ultimate, foolproof CORS bypass. 
// This allows ANY Vercel URL to connect without strict matching.
app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Robust MongoDB Connection
mongoose.connect(URI)
  .then(() => console.log('✅ MongoDB is successfully connected'))
  .catch((error) => console.log('❌ MongoDB Connection Error:', error));

app.get('/', (req, res) => {
  res.send('CodeGenie Backend is Running');
});

// Clean Routes
app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});