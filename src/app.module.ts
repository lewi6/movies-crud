import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movies/movies.module';
import { UserModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SupabaseModule } from './supabase/supabase.module';
import { PushNotificationsModule } from './notifications/notification.module';

@Module({
  imports: [
    UserModule,
    MovieModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    PushNotificationsModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
      serveRoot: '/swagger-ui',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
