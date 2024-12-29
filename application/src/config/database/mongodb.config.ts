import mongoose from 'mongoose';
import config from '@config/env/dotenv.config';

class MongoConnection {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(config.database_url);
      console.log('MongoDb connect');
    } catch (error) {
      console.log('Error to connect database: ', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDb disconnected');
    } catch (error) {
      console.log('Error disconnect Mongodb: ', error);
      process.exit(1);
    }
  }
}

export { MongoConnection };
