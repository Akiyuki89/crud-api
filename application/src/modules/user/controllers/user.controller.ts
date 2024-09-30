import { Request, Response } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { ICreateUser } from '@core/interfaces/user.interface';

const userService = new UserService();

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user: ICreateUser = req.body;

      if (user.password !== req.body.confirmpassword) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
      }

      const createdUser = await userService.createUser(user);

      const { password, ...userWithoutPassword } = createdUser;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async readAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.readAllUsers();

      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return res.status(200).json(usersWithoutPasswords);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async readUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.params;
      const user = await userService.readUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const { password, ...userWithoutPassword } = user;

      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.params;
      const updateData = req.body;

      const updatedUser = await userService.updateUser(email, updateData);

      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      const { password, ...userWithoutPassword } = updatedUser;

      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.params;

      const deletedUser = await userService.deleteUserByEmail(email);

      if (!deletedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { UserController };
