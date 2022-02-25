import { Router } from 'express';
import * as UserController from '../../controllers/user.controller';
import { jwtMiddleware } from '../../middlewares/jwt.middleware';


const api = Router();

api.get('/:id/posts', UserController.getPost);
api.get('/:id/profile', UserController.getProfile);
api.patch('/:id/profile', UserController.UpdateProfile);
api.delete('/:id', UserController.deleteOne);




export default api;