import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUser(user) {
    const { username, id } = user;
    const userFind = await this.userRepository.findOne({ where: { id } });
    userFind.password = null;
    return userFind;
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const { username, email, password } = createUserDto;
    const user = this.userRepository.create({ username, email, password });

    return await this.userRepository.save(user);
  }

  async updateUser(user, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    const { username } = user;
    const updatedUser = await this.userRepository.findOne({
      where: { username },
    });
    updatedUser.email = email;

    return await this.userRepository.save(updatedUser);
  }

  async deleteUser(user: any) {
    console.log(user);
    const result = await this.userRepository.softDelete({
      id: user.id,
    });
    if (result.affected === 0) {
      return 'Failed to delete User';
    }
    return 'Success to delete User';
  }
}
