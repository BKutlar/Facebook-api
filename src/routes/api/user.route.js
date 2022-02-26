import { Router } from 'express';
import * as UserController from '../../controllers/user.controller';



const api = Router();

api.get('/:id/posts', UserController.getPost);
api.get('/:id/profile', UserController.getProfile);
api.get('/', UserController.paginateKeyset)
api.patch('/:id/profile', UserController.UpdateProfile);
api.delete('/:id', UserController.deleteOne);




export default api;