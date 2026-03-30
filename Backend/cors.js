import cors from 'cors';

const corsOptions = {
  // Allow all origins temporarily so localhost:5173, 5174, etc all work
  origin: '*', 
  credentials: true,
};

export default cors(corsOptions);