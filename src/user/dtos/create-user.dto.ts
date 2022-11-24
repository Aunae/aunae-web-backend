import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entities';
import { IsString } from 'class-validator';

// password의 class-validator는 user entity로 이동
export class CreateUserDto extends PickType(User, ['email', 'username']) {
  @ApiProperty()
  @IsString()
  password: string;
}
