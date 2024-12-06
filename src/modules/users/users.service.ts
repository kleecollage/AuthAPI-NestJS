import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/users/dto/user-dto';
import { User } from 'src/modules/users/schemas/userSchema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.populateUsers();
  }
  async populateUsers() {
    const users: UserDto[] = [
      {
        email: 'test1@mail.com',
        password: '123456',
      },
      {
        email: 'admin1@mail.com',
        password: '123456',
      },
    ];
    for (const user of users) {
      const userExists = await this.getUserByEmail(user.email);
      if (!userExists) await this.createUser(user);
    }
  }
  //** ---------------------------------------- CREATE USER ----------------------------------------  **//
  async createUser(user: UserDto) {
    const userExists = await this.userModel.findOne({ email: user.email });
    if (userExists)
      throw new ConflictException(`Email "${user.email}" alredy exists`);

    const u = new this.userModel(user);
    await u.save();

    u.password = undefined;

    return u;
  }
  //** ---------------------------------------- GET USERS ----------------------------------------  **//
  getUsers() {
    return this.userModel.find({}, { password: 0 }); // omit passwords
  }
  //** ---------------------------------------- GET USER BY EMAIL ----------------------------------------  **//
  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
