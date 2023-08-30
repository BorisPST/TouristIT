import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { name } from '../../package.json';
import { version } from '../../package.json';
import { description } from '../../package.json';
import { AppInfo } from './app-info.model';
import { AppSettings } from './app-settings.model';

@Injectable()
export class AppSettingsService {
  private appSettings: AppSettings;

  constructor(private readonly configService: ConfigService) {
    const appInfo: AppInfo = new AppInfo(name, version, description);

    const environment: string = this.configService.get<string>('NODE_ENV');
    const port: number = this.configService.get<number>('SERVER_PORT');

    this.appSettings = new AppSettings(appInfo, environment, port);
  }

  getAppSettings(): AppSettings {
    return this.appSettings;
  }
}
