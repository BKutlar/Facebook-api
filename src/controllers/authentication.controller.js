import jwt from 'jsonwebtoken';
import * as AuthenticationModel from '../models/user.model';
import { HttpStatus, HttpException } from '../errors/HttpException.error';

export const LoginDTo = async (request, response) => {
  const { email, password } = request.body;

  if (email === undefined || password === undefined) {
    throw new HttpException('Unaunthorized,', HttpStatus.UNAUTHORIZED);
  }

  const user = await AuthenticationModel.findByCredentials({ email, password }, { id: true, email: true });

  if (!user) {
    throw new HttpException('Unaunthorized,', HttpStatus.UNAUTHORIZED);
  }
  const token = jwt.sign({ id: user.id }, 'SECRET');

  response.json({ token, user });
}

export const RegisterDTo = async (request, response) => {
  const { email, password } = request.body;
  const user = await AuthenticationModel.createOne({ email, password });

  response.status(201).json({ user });
}