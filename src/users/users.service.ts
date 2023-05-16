import { Injectable } from '@nestjs/common';
import { User, userInput } from './users.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  insertUser({ age, email, surname, name }: userInput) {
    const id = uuid();
    const newUser = new User(id, name, age, surname, email);
    this.users.push(newUser);

    return newUser;
  }
  getAllUsers() {
    return [...this.users];
  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
