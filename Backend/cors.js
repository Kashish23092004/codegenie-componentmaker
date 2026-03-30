import cors from 'cors';

const corsOptions = {
  origin: [
    'https://codegenie-componentmaker-gljf9aegf-kashish23092004s-projects.vercel.app/',
    'http://localhost:5173',
    'http://localhost:5174'
  ], 
  credentials: true,
};

export default cors(corsOptions);