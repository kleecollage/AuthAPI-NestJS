import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-credentials-dto';

@Controller('/api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    description: 'Log in the app',
  })
  @ApiBody({
    description: 'Logs in the app using the credentials',
    type: AuthCredentialsDto,
    examples: {
      example: {
        value: {
          email: 'test1@mail.com',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Login oks',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Return info of the logued user',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('jwt')
  dataUser(@Req() request) {
    return request.user;
  }
}
