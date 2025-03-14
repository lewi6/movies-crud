import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseService } from '../supabase/supabase.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UsersService, SupabaseService],
})
export class UserModule {}
