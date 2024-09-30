import { Router } from 'express';
import { UserController } from '@modules/user/controllers/user.controller';

const router = Router();

router.post('/users', new UserController().createUser);
router.get('/users', new UserController().readAllUsers);
router.get('/users/:email', new UserController().readUserByEmail);
router.put('/users/:email', new UserController().updateUser);
router.delete('/users/:email', new UserController().deleteUser);

export { router };
