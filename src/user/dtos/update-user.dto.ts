import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entities';

export class UpdateUserDto extends PickType(User, [
  'email',
  'password',
  'username',
  'coverImg',
]) {}
