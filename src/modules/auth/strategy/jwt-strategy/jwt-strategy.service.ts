import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secretKey'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) throw new UnauthorizedException();

    user.password = undefined;

    return user;
  }
}
