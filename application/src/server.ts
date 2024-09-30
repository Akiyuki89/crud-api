import { App } from '@config/app/app';
import config from '@config/env/dotenv.config';

const app = new App();
const port: number = parseInt(config.port as string, 10);

app.startServer(port);
