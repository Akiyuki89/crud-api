import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  descriptions: Record<string, string>;
  password: string;
}

export { IUser };
