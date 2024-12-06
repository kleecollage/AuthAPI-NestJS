import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'User email to log',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'User password to log',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
