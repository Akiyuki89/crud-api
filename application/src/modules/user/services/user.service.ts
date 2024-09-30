import { UserModel } from '@modules/user/models/user.model';
import { ICreateUser } from '@core/interfaces/user.interface';
import { IUser } from '@core/interfaces/model.interface';
import { Encryption } from '@core/utils/encryption.util';

class UserService {
  private userModel = UserModel;

  async createUser(user: ICreateUser): Promise<IUser> {
    try {
      const existingUser = await this.userModel.findOne({ email: user.email }).exec();

      if (existingUser) {
        throw new Error('User already exists');
      }

      if (user.password !== user.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const hashedPassword = new Encryption().encryptPassword(user.password);

      const newUser = new this.userModel({
        name: user.name,
        email: user.email,
        descriptions: user.descriptions,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(`Error adding user: ${error.message}`);
    }
  }

  async readAllUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async readUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      console.error('Error fetching user by email:', error.message);
      throw new Error(`Error searching user by email: ${error.message}`);
    }
  }

  async updateUser(email: string, updateData: Partial<IUser>): Promise<IUser | null> {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ email }, { $set: updateData }, { new: true, runValidators: true })
        .exec();

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUserByEmail(email: string): Promise<IUser> {
    try {
      const existingUser = await this.userModel.findOne({ email }).exec();

      if (!existingUser) {
        throw new Error('User does not exist');
      }

      return await this.userModel.findOneAndDelete({ email }).exec();
    } catch (error) {
      console.error('Error deleting user by email', error.message);
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export { UserService };
