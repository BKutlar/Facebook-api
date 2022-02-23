import { Router } from 'express';
import * as AuthenticationController from '../../controllers/authentication.controller';

const api = Router();

api.post('/login', AuthenticationController.LoginDTo);
api.post('/register', AuthenticationController.RegisterDTo);

export default api;
