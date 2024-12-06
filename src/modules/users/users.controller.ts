import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-credentials-dto';
import { UserDto } from 'src/modules/users/dto/user-dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Create new user',
  })
  @ApiBody({
    description: 'Creates a user using UserDto',
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
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Return all users',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 201,
    description: 'Users returned successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getUsers() {
    return this.userService.getUsers();
  }
}
