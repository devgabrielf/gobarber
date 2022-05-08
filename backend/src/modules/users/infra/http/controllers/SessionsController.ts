import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

interface ISessionResponse {
  user: IUserResponse;
  token: string;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token }: ISessionResponse = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
