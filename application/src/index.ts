import 'module-alias/register';
import { App } from '@config/app/app.config';
import config from '@config/env/dotenv.config';

const app = new App();

const host: string = config.host as string;
const port: number = parseInt(config.port as string, 10);

app.startServer(port, host);
