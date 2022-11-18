import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entities';

// password의 class-validator는 user entity로 이동
export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'username',
]) {}
