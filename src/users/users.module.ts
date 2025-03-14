import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, SupabaseService],
})
export class UserModule {}
