import { Inject, Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

import { VAPID } from './notification.constants';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PushNotificationsService {
  constructor(
    @Inject(VAPID) private readonly webpush: typeof webPush,
    private readonly supabaseService: SupabaseService,
  ) {
    console.log('webPush initialized');
  }

  // Store subscriptions (in production, use a database)
  private subscriptions: any[] = [];

  // Send notification to a specific subscription
  async sendNotification(userId: any, message: any, fromId: any) {
    const client = await this.supabaseService.getOneClient(userId);

    console.log(
      client.subscription,
      JSON.stringify({ title: client.name, message: message }),
    );

    if (!client.subscription) {
      return 'No subscription found for user';
    }

    return this.webpush.sendNotification(
      client.subscription,
      JSON.stringify({ title: fromId, message: message }),
    );
  }

  // Send notification to all stored subscriptions
  async sendNotificationToAll(payload: any, fromId: any) {
    const notifications = this.subscriptions.map((subscription) =>
      this.sendNotification(subscription, payload, fromId),
    );

    return Promise.all(notifications);
  }
}
