import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/user-dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.getUsers();
  }
}
