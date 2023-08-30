import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInfo } from './app-settings/app-info.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAbout(): AppInfo {
    return this.appService.getAppInfo();
  }
}
