import express from 'express';
import cors from 'cors';
import { MongoConnection } from '@config/database/mongodb.config';
import { corsOptions } from '@core/utils/cors.util';
import { router } from '@modules/user/routes/user.routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }

  configureRoutes() {
    this.app.use(router);
  }

  async startServer(port: number, host: string) {
    try {
      await MongoConnection.connect();
      this.configureMiddlewares();
      this.configureRoutes();

      this.app.listen(port, host, () => {
        console.log(`Server started on http://${host}:${port}`);
      });
    } catch (error) {
      console.log('Error starting server:', error);
      process.exit(1);
    }
  }
}

export { App };
