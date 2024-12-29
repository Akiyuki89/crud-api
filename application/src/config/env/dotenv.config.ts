import dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  database_url: process.env.MONGO_CONNECTION || '',
  origin: process.env.ORIGIN_URL || 'http://localhost:3000',
};
