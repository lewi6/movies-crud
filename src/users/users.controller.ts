import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { User, userInput } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user again', description: 'you know' })
  insertUser(@Body('userObj') userObj: userInput) {
    const user = this.userService.insertUser(userObj);
    return user;
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }
}
