import { MongoConnection } from '../../src/config/database/mongodb.config';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('MongoConnection', () => {
  const originalExit = process.exit;

  beforeAll(() => {
    process.exit = jest.fn() as any;
  });

  afterAll(() => {
    process.exit = originalExit;
  });

  it('should connect to MongoDB successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(MongoConnection.Connect()).resolves.not.toThrow();
  });

  it('should throw an error if connection fails', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));

    await expect(MongoConnection.Connect()).rejects.toThrow('Failed to connect to MongoDB');
  });
});
