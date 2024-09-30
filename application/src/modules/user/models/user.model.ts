import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@core/interfaces/model.interface';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    descriptions: {
      type: Map,
      of: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { UserModel };
