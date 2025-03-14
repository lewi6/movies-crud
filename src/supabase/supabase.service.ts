// supabase/supabase.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE } from './supabase.constants';
import { LoginDto } from 'src/users/users.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SupabaseService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {
    console.log('SupabaseService initialized');
    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      console.log('Verifying Supabase connection...');
      console.log('Auth initialized:', !!this.supabase.auth);

      // Test if we can make a simple request
      const { data, error } = await this.supabase
        .from('clients')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Supabase connection test failed:', error);
      } else {
        console.log('✅ Supabase connection test successful');
      }
    } catch (error) {
      console.error('❌ Failed to verify Supabase connection:', error);
    }
  }
  async getOneClient(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .select('id,name,subscription')
        .eq('id', userId)
        .single();

      return data;
    } catch (error) {
      console.error('Error in SupabaseService.getOneClient:', error);
      throw error;
    }
  }

  async getClients() {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .select('id, name,subscription')
        .throwOnError();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error);
      }

      if (!data) {
        console.warn(
          'No data returned from Supabase (data is null or undefined)',
        );
        return [];
      }

      return data.map((client) => ({
        id: client.id,
        name: client.name,
        subscribed: client.subscription ? true : false,
      }));
    } catch (err) {
      const error = err as Error;
      console.error('Detailed Supabase error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      throw error;
    }
  }

  async insertClient(clientData: { name: string; password: string }) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .insert([{ ...clientData, online: false }])
        .select()
        .throwOnError();

      if (error) {
        console.error('Error inserting client:', error);
        throw new Error(error);
      }

      return data?.[0];
    } catch (err) {
      const error = err as Error;
      console.error('Failed to insert client:', error);
      throw error;
    }
  }

  async login(loginData: LoginDto) {
    try {
      // First verify the credentials
      const { data: client, error: fetchError } = await this.supabase
        .from('clients')
        .select('id, name, password')
        .eq('name', loginData.name)
        .eq('password', loginData.password)
        .single();

      if (fetchError || !client) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Update online status
      const { data, error: updateError } = await this.supabase
        .from('clients')
        .update({ session_id: uuid() })
        .eq('id', client.id)
        .select('id, name, session_id')
        .single();

      if (updateError) {
        throw new Error('Failed to update online status');
      }

      console.log('login data', data);

      return data;
    } catch (error) {
      console.error('Login error:', error?.response?.data?.message);

      throw error;
    }
  }

  async activateNoTification(client: {
    session_id: number;
    subscription: string;
  }) {
    try {
      // First verify the credentials

      console.log('activateNoTification', client);

      // Update online status
      const { data, error: updateError } = await this.supabase
        .from('clients')
        .update({ subscription: client.subscription })
        .eq('session_id', client.session_id)
        .select('id, name, session_id')
        .single();

      if (!data) {
        return `User not found`;
      }
      if (updateError) {
        throw new Error(JSON.stringify(updateError));
      }

      return `Notification activated for ${data.name}`;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(session_id: string) {
    try {
      const { data, error } = await this.supabase
        .from('clients')
        .update({ session_id: null, subscription: null })
        .eq('session_id', session_id)
        .select()
        .single();

      if (!data) {
        return `User not found`;
      }

      if (error) {
        throw new Error('Failed to logout user');
      }

      return `User ${data.name} logged out`;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getUserBySessionId(session_id: string) {
    try {
      console.log('getUserBySessionId', session_id);
      const { data, error } = await this.supabase
        .from('clients')
        .select('id, name, subscription')
        .eq('session_id', session_id)
        .single();
      if (!data) {
        return { message: `User not found`, status: 404 };
      }

      if (error) {
        throw new Error('Failed to logout user');
      }

      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}
