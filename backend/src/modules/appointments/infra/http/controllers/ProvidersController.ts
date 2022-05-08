import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import User from '@modules/users/infra/typeorm/entities/User';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers: IUserResponse[] = await listProviders.execute({
      user_id,
    });

    providers.forEach(provider => {
      const user = provider;

      delete user.password;

      return user;
    });

    return response.json(providers);
  }
}
