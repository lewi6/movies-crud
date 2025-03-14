import { Injectable } from '@nestjs/common';
import { User, CreateUserDto, ClientDto, LoginDto } from './users.model';
import { v4 as uuid } from 'uuid';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly supabase: SupabaseService) {
    console.log('UsersService initialized');
  }

  async getClients() {
    try {
      console.log('UsersService: Calling getClients on SupabaseService');
      const clients = await this.supabase.getClients();
      console.log(
        'UsersService: Received clients from SupabaseService:',
        clients,
      );
      return clients;
    } catch (error) {
      console.error('Error in UsersService.getClients:', error);
      throw error;
    }
  }

  async insertClient(clientData: ClientDto) {
    try {
      return await this.supabase.insertClient(clientData);
    } catch (error) {
      console.error('Error in UsersService.insertClient:', error);
      throw error;
    }
  }

  async login(loginData: LoginDto) {
    try {
      return await this.supabase.login(loginData);
    } catch (error) {
      console.error('Error in UsersService.login:', error);
      throw error;
    }
  }

  async logout(session_id: string) {
    try {
      return await this.supabase.logout(session_id);
    } catch (error) {
      console.error('Error in UsersService.logout:', error);
      throw error;
    }
  }

  async activateNoTification(client: {
    session_id: number;
    subscription: string;
  }) {
    try {
      return await this.supabase.activateNoTification(client);
    } catch (error) {
      console.error('Error in UsersService.activateNoTification:', error);
      throw error;
    }
  }

  async getUserBySessionId(session_id: string) {
    try {
      return await this.supabase.getUserBySessionId(session_id);
    } catch (error) {
      console.error('Error in UsersService.getUserBySessionId:', error);
      throw error;
    }
  }
  insertUser({ name, age, surname, email }: CreateUserDto) {
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
