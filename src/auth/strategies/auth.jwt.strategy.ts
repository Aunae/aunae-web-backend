import { AuthService } from './../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  /**
   * @description function name must be validate
   * @param payload 토큰 내용 전송
   * @returns
   */
  async validate(payload: any) {
    // req로 보내줌
    return { username: payload.username, id: payload.sub };
  }
}
