import cors from 'cors';

const corsOptions = {
  origin: [ "http://localhost:5173",
    "https://codegenie-componentmaker-client.onrender.com"],
  credentials: true,
};

export default cors(corsOptions);
