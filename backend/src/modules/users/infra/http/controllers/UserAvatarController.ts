import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UploadUserAvatarService';

import AppError from '@shared/errors/AppError';

import User from '../../typeorm/entities/User';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      if (!request.file) {
        throw new AppError('File not found');
      }

      const user: IUserResponse = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(classToClass(user));
    } catch (err) {
      const { message } = err as Error;

      return response.status(400).json({ error: message });
    }
  }
}
