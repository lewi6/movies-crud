// supabase/supabase.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from './supabase.constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE,
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>('SUPABASE_KEY');
        console.log('supabaseUrl', supabaseUrl);
        console.log('supabaseKey', supabaseKey);
        return createClient(supabaseUrl, supabaseKey);
      },
      inject: [ConfigService],
    },
  ],
  exports: [SUPABASE],
})
export class SupabaseModule {}
