import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-credentials-dto';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userCredentials: AuthCredentialsDto) {
    const user = await this.userService.getUserByEmail(userCredentials.email);
    if (user) {
      const passwordOk = await bcrypt.compare(
        userCredentials.password,
        user.password,
      );

      if (passwordOk) return user;
    }
    return null;
  }

  async login(authCredentials: AuthCredentialsDto) {
    const user = await this.validateUser(authCredentials);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { email: user.email };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
