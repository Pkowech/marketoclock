import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('health')
  getHealth(): string {
    return 'OK';
  }
    @Get('status')
    getStatus(): string {
      return 'Service is running';
    }
  @Get('info')
  getInfo(): string {
    return 'This is a simple NestJS application';
    }
  @Get('version')
  getVersion(): string {
    return '1.0.0';
  }
  @Get('docs')
  getDocs(): string {
    return 'API documentation can be found at /api/docs';
  }
  @Get('ping')
  getPing(): string {
    return 'pong';
  }
  @Get('about')
  getAbout(): string {
    return 'This is a simple NestJS application for managing products and categories.';
  }
}
