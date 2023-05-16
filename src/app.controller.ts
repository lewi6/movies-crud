import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const moviesApiKey = process.env.MOVIES_API_KEY;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
