import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entities';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUserDto } from './dtos/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email } = createUserDto;
    const user = this.userRepository.create(createUserDto);

    const isExist = await this.findUser({ email });
    if (isExist) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }

    /** Todo: User Act 작업 */
    await this.userRepository.save(user);
  }

  async findUser(findUserProps: FindUserDto) {
    if (Object.keys(findUserProps).length == 0)
      throw new Error('유저를 찾기를 수행할 수 없습니다'); // 추후 에러 메세지 분할 수행
    return await this.userRepository.findOne({
      where: { ...findUserProps },
    });
  }

  async updateUser(user, updateUserDto: UpdateUserDto) {
    const { email, username, ...updatePayload } = updateUserDto;
    const updatedUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (email) {
      const isExist = await this.userRepository.findOneBy({ email });
      if (isExist) {
        throw new BadRequestException('이미 존재하는 이메일입니다.');
      }
      updatedUser.email = email;
    }
    if (username) {
      const isExist = await this.userRepository.findOneBy({ username });
      if (isExist) {
        throw new BadRequestException('이미 존재하는 닉네임입니다.');
      }
      updatedUser.username = username;
    }
    for (const propKey in updatePayload) {
      if (updatePayload[propKey]) {
        updatedUser[propKey] = updatePayload[propKey];
      }
    }
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
