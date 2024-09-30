import { UserService } from '../../src/modules/user/services/user.service';
import { UserModel } from '../../src/modules/user/models/user.model';
import { ICreateUser } from '../../src/core/interfaces/user.interface';

jest.mock('../../src/modules/user/models/user.model');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should create a user successfully', async () => {
    const user: ICreateUser = {
      name: 'Test User',
      email: 'test@example.com',
      descriptions: { bio: 'A test user' },
      password: 'password123',
      confirmPassword: 'password123',
    };

    UserModel.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    UserModel.prototype.save = jest.fn().mockResolvedValue({
      name: user.name,
      email: user.email,
      descriptions: user.descriptions,
      password: 'hashed_password',
    });

    const createdUser = await userService.createUser(user);

    expect(createdUser).toHaveProperty('email', user.email);
  });

  it('should throw an error if user already exists', async () => {
    const user: ICreateUser = {
      name: 'Test User',
      email: 'test@example.com',
      descriptions: { bio: 'A test user' },
      password: 'password123',
      confirmPassword: 'password123',
    };

    UserModel.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(user),
    });

    await expect(userService.createUser(user)).rejects.toThrow('User already exists');
  });
});
