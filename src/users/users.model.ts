import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'First name or username of the user',
    example: 'lewi6',
    minLength: 2,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Age of the user in years',
    example: 32,
    minimum: 0,
    maximum: 150,
  })
  age: number;

  @ApiProperty({
    description: 'Last name or family name of the user',
    example: 'lubala',
    minLength: 2,
    maxLength: 50,
  })
  surname: string;

  @ApiProperty({
    description: 'Email address for contact',
    example: 'izlewi6@gmail.com',
    format: 'email',
  })
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

export class CreateUserDto {
  @ApiProperty({
    description: 'First name or username of the user',
    example: 'lewi6',
    minLength: 2,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Age of the user in years',
    example: 32,
    minimum: 0,
    maximum: 150,
  })
  age: number;

  @ApiProperty({
    description: 'Last name or family name of the user',
    example: 'lubala',
    minLength: 2,
    maxLength: 50,
  })
  surname: string;

  @ApiProperty({
    description: 'Email address for contact',
    example: 'izlewi6@gmail.com',
    format: 'email',
  })
  email: string;
}

export class ClientDto {
  @ApiProperty({
    description: 'Username for client authentication',
    example: 'john_doe',
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z0-9_-]+$',
  })
  name: string;

  @ApiProperty({
    description: 'Password for client authentication',
    example: 'password123',
    minLength: 8,
    maxLength: 100,
    writeOnly: true,
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Username for authentication',
    example: 'john_doe',
    minLength: 3,
    maxLength: 30,
  })
  name: string;

  @ApiProperty({
    description: 'Password for authentication',
    example: 'password123',
    minLength: 8,
    maxLength: 100,
    writeOnly: true,
  })
  password: string;
}

export class ActivateNotificationDto {
  @ApiProperty({
    description: 'Session ID for the user',
    example: 123,
  })
  session_id: number;

  @ApiProperty({
    description: 'Subscription for the user',
    example: 'monthly',
  })
  subscription: string;
}
export class LogoutDto {
  @ApiProperty({
    description: 'Session ID for the user',
    example: 123,
  })
  session_id: string;
}

export class SessionIdDto {
  @ApiProperty({
    description: 'Session ID',
    example: '1234567890',
  })
  session_id: string;
}
