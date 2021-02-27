import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) { }

  @Get()
  getAll(@Query('search') search: string): string {
  	this.logger.log('search '+search);
    return this.appService.getAll(search);
  }
}
