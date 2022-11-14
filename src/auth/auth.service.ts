import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { User } from 'src/user/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getToken(user) {
    const { password, ...result } = user;

    const payload = { user_id: user.username, sub: user.id };
    const accessToken = await this.jwtService.sign(payload, {
      privateKey: jwtConstants.secret,
    });
    result['token'] = accessToken;
    return result;
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
