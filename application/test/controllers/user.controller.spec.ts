import request from 'supertest';
import express from 'express';
import { UserController } from '../../src/modules/user/controllers/user.controller';
import { UserService } from '../../src/modules/user/services/user.service';
import { ICreateUser } from '../../src/core/interfaces/user.interface';

jest.mock('@modules/user/services/user.service');

const app = express();
app.use(express.json());

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController();

    app.post('/users', (req, res) => userController.createUser(req, res));
    app.get('/users', (req, res) => userController.readAllUsers(req, res));
    app.get('/users/:email', (req, res) => userController.readUserByEmail(req, res));
  });

  it('should create a user successfully', async () => {
    const user: ICreateUser = {
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456',
      name: '',
      descriptions: undefined
    };

    (userService.createUser as jest.Mock).mockResolvedValue(user);

    const res = await request(app).post('/users').send(user);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
    expect(res.body.password).toBeUndefined();
  });

  it('should return 400 if passwords do not match', async () => {
    const user = {
      email: 'test@example.com',
      password: '123456',
      confirmpassword: '654321',
    };

    const res = await request(app).post('/users').send(user);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('As senhas não coincidem.');
  });

  it('should return all users without passwords', async () => {
    const users = [
      { email: 'user1@example.com', password: '123456' },
      { email: 'user2@example.com', password: '654321' },
    ];

    (userService.readAllUsers as jest.Mock).mockResolvedValue(users);

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].password).toBeUndefined();
  });
});
