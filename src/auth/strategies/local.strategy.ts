import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local'; // must local not jwt
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // username 키 이름 변경 user_id로 요청
      usernameField: 'username',
    });
  }
  // function name must 'validate'
  async validate(username: string, password: string): Promise<any> {
    const userFind = await this.authService.findUserByUsername(username);
    const isValid = await bcrypt.compare(password, userFind.password);
    if (!isValid) {
      console.log(userFind);
      throw new UnauthorizedException('User not found');
    }
    return this.authService.getToken(userFind);
  }
}
