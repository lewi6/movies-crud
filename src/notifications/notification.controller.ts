import { Controller, Post, Body, Get } from '@nestjs/common';
import { PushNotificationsService } from './notifications.service';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

class SendNotificationDto {
  userId: string;
  message: string;
  fromId: string;
}

class SendNotificationToAllDto {
  payload: any;
  fromId: string;
}

@ApiTags('Push Notifications')
@Controller('push-notifications')
export class PushNotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @Post('send')
  @ApiOperation({
    summary: 'Send push notification to specific user',
    description:
      'Sends a push notification to a single user identified by their userId',
  })
  @ApiBody({
    type: SendNotificationDto,
    examples: {
      validLogin: {
        summary: 'Valid Login Example',
        value: {
          userId: 1,
          message: 'Hello, world!',
          fromId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Push notification sent successfully',
  })
  async sendNotification(@Body() body: SendNotificationDto) {
    return this.pushNotificationsService.sendNotification(
      body.userId,
      body.message,
      body.fromId,
    );
  }

  @Post('send-all')
  @ApiOperation({
    summary: 'Send push notification to all users',
    description: 'Broadcasts a push notification to all registered users',
  })
  @ApiBody({ type: SendNotificationToAllDto })
  @ApiResponse({
    status: 200,
    description: 'Push notification broadcast successfully',
  })
  async sendNotificationToAll(@Body() body: SendNotificationToAllDto) {
    return this.pushNotificationsService.sendNotificationToAll(
      body.payload,
      body.fromId,
    );
  }

  @Get('vapid-public-key')
  @ApiOperation({
    summary: 'Get VAPID public key',
    description:
      'Retrieves the VAPID public key used for push notification authentication',
  })
  @ApiResponse({
    status: 200,
    description: 'VAPID public key retrieved successfully',
    schema: {
      properties: {
        publicKey: {
          type: 'string',
          description: 'The VAPID public key',
        },
      },
    },
  })
  getVapidPublicKey() {
    return {
      publicKey: process.env.PUBLIC_VAPID_KEY,
    };
  }
}
