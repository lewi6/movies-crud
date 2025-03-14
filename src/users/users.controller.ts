import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  ActivateNotificationDto,
  ClientDto,
  LoginDto,
  LogoutDto,
  SessionIdDto,
} from './users.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/clients')
  @ApiOperation({
    summary: 'Get all clients',
    description:
      'Retrieve all clients from the database with their details including creation date and subscription status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all clients retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Unique identifier for the client',
          },
          name: { type: 'string', description: 'Username of the client' },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the client was created',
          },
          password: {
            type: 'string',
            description: 'Hashed password of the client',
          },
          subscription: {
            type: 'object',
            nullable: true,
            description: 'Subscription details if any',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to fetch clients' },
        error: { type: 'string', example: 'Internal Server Error' },
        details: { type: 'string', example: 'Error message details' },
      },
    },
  })
  async getClients() {
    try {
      console.log('UserController: Handling GET /clients request');
      const clients = await this.userService.getClients();
      console.log('UserController: Received clients from service:', clients);
      return clients;
    } catch (error) {
      console.error('Error in UserController.getClients:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch clients',
          error: 'Internal Server Error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/clients')
  @ApiOperation({
    summary: 'Create new client',
    description:
      'Create a new client in the database with username and password',
  })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'Auto-generated unique identifier',
        },
        name: { type: 'string', description: 'Username of the client' },
        created_at: {
          type: 'string',
          format: 'date-time',
          description: 'Timestamp of creation',
        },
        password: { type: 'string', description: 'Hashed password' },
        subscription: {
          type: 'object',
          nullable: true,
          description: 'Subscription information (null for new clients)',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Missing required fields' },
        error: { type: 'string', example: 'Bad Request' },
        details: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Name is required' },
            password: { type: 'string', example: 'Password is required' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Failed to create client' },
        error: { type: 'string', example: 'Internal Server Error' },
        details: { type: 'string', example: 'Error message details' },
      },
    },
  })
  async insertClient(@Body() clientData: ClientDto) {
    try {
      if (!clientData.name || !clientData.password) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Missing required fields',
            error: 'Bad Request',
            details: {
              name: !clientData.name ? 'Name is required' : undefined,
              password: !clientData.password
                ? 'Password is required'
                : undefined,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const client = await this.userService.insertClient(clientData);
      return client;
    } catch (error) {
      console.error('Error inserting client:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create client',
          error: 'Internal Server Error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user and update online status to true',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login credentials',
    examples: {
      validLogin: {
        summary: 'Valid Login Example',
        value: {
          name: 'john_doe',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'User ID' },
        name: { type: 'string', description: 'Username' },
        online: { type: 'boolean', description: 'Online status' },
        created_at: { type: 'string', format: 'date-time' },
        subscription: { type: 'object', nullable: true },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  async login(@Body() loginData: LoginDto) {
    try {
      console.log('loginData', loginData);
      const user = await this.userService.login(loginData);
      return user;
    } catch (error) {
      if (error.status === 401) {
        throw error;
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to login',
          error: 'Internal Server Error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/logout')
  @ApiOperation({
    summary: 'Logout user',
    description: 'Update user online status to false',
  })
  @ApiBody({
    type: LogoutDto,
    description: 'Notification activation details',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'User ID' },
        name: { type: 'string', description: 'Username' },
        online: { type: 'boolean', description: 'Online status (false)' },
        created_at: { type: 'string', format: 'date-time' },
        subscription: { type: 'object', nullable: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async logout(@Body() logoutData: LogoutDto) {
    try {
      const user = await this.userService.logout(logoutData.session_id);
      return user;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to logout',
          error: 'Internal Server Error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/activate-notification')
  @ApiOperation({
    summary: 'Activate notification',
    description: 'Activate notification for a user',
  })
  @ApiBody({
    type: ActivateNotificationDto,
    description: 'Notification activation details',
  })
  async activateNotification(
    @Body() activateNotificationData: ActivateNotificationDto,
  ) {
    try {
      const result = await this.userService.activateNoTification(
        activateNotificationData,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to activate notification',
          error: 'Internal Server Error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/profile')
  @ApiOperation({
    summary: 'Get user by session ID',
    description: 'Get user by session ID',
  })
  @ApiBody({ type: SessionIdDto })
  async getUserBySessionId(@Body() sessionData: SessionIdDto) {
    console.log('sessionData', sessionData);
    const user = await this.userService.getUserBySessionId(
      sessionData.session_id,
    );
    return user;
  }
}
