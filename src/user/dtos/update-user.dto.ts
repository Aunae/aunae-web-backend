import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
}
