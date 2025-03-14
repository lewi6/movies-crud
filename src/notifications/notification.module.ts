import { Module } from '@nestjs/common';
import * as webPush from 'web-push';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PushNotificationsController } from './notification.controller';
import { PushNotificationsService } from './notifications.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { VAPID } from './notification.constants';

@Module({
  imports: [ConfigModule, SupabaseModule],
  controllers: [PushNotificationsController],
  providers: [
    PushNotificationsService,
    SupabaseService,
    {
      provide: VAPID,
      useFactory: (configService: ConfigService) => {
        // Set VAPID details for the web-push library
        const publicVapidKey = configService.get<string>('PUBLIC_VAPID_KEY');
        const privateVapidKey = configService.get<string>('PRIVATE_VAPID_KEY');

        webPush.setVapidDetails(
          'mailto:izerelewis6@gmail.com', // Contact information
          publicVapidKey,
          privateVapidKey,
        );
        return webPush;
      },
      inject: [ConfigService],
    },
  ],
  exports: [PushNotificationsService, VAPID],
})
export class PushNotificationsModule {}
