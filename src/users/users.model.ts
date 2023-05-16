import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'this is assigned automatically on creation' })
  id: string;

  @ApiProperty({ example: 'lewi6' })
  name: string;

  @ApiProperty({ example: 32 })
  age: number;

  @ApiProperty({ example: 'lubala' })
  surname: string;

  @ApiProperty({ example: 'izlewi6@gmail.com' })
  email: string;

  constructor(
    id: string,
    name: string,
    age: number,
    surname: string,
    email: string,
  ) {
    this.id = id;
    this.age = age;
    this.surname = surname;
    this.email = email;
    this.name = name;
  }
}

export type userInput = Omit<User, 'id'>;
