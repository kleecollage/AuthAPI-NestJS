import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
