import request from 'supertest';
import { App } from '../src/config/app/app';
import { MongoConnection } from '@config/database/mongodb.config';

jest.mock('@config/database/mongodb.config');

describe('App', () => {
  let appInstance: App;

  beforeEach(() => {
    appInstance = new App();
    appInstance.configureMiddlewares();
    appInstance.configureRoutes();
  });

  it('should configure middlewares', async () => {
    const response = await request(appInstance.app).get('/'); 
    expect(response.status).not.toBe(404); 
  });

  it('should have routes configured', async () => {
    const response = await request(appInstance.app).get('/users');
    expect(response.status).toBe(200);
  });

  it('should start the server without crashing', async () => {
    MongoConnection.Connect = jest.fn().mockResolvedValue(true); 

    const port = 3000;
    await expect(appInstance.startServer(port)).resolves.not.toThrow();
  });
});
