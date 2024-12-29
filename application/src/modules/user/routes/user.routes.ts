import { Router } from 'express';
import { UserController } from '@modules/user/controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/users', userController.createUser.bind(userController));
router.get('/users', userController.readAllUsers.bind(userController));
router.get('/users/:email', userController.readUserByEmail.bind(userController));
router.put('/users/:email', userController.updateUser.bind(userController));
router.delete('/users/:email', userController.deleteUser.bind(userController));

export { router };
