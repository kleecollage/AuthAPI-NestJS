import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-credentials-dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(userCredentials: AuthCredentialsDto) {
    const user = await this.userService.getUserByEmail(userCredentials.email);

    if (user) {
      const passwordOk = bcrypt.compare(
        userCredentials.password,
        user.password,
      );

      if (passwordOk) return user;
    }
    return null;
  }
}
