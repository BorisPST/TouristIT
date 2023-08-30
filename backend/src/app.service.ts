import { Injectable } from '@nestjs/common';

import { AppInfo } from './app-settings/app-info.model';
import { AppSettingsService } from './app-settings/app-settings.service';

@Injectable()
export class AppService {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  getAppInfo(): AppInfo {
    return this.appSettingsService.getAppSettings().info;
  }
}
