import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  }, 
  credentials: true,
};

export default cors(corsOptions);