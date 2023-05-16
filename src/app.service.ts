import { Injectable } from '@nestjs/common';
const moviesUrl = process.env.MOVIES_ENDPOINT;
const moviesApiKey = process.env.MOVIES_API_KEY;
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
