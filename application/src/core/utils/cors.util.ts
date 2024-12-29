import config from '@config/env/dotenv.config';

const corsOptions = {
  origin: config.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export { corsOptions };
