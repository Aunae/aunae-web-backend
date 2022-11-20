import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entities';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUser(userId: string) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = this.userRepository.create(createUserDto);

    const isExist = await this.userRepository.findOneBy({ email });
    if (isExist) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }

    /** Todo: User Act 작업 */

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
