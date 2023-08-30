import { AppInfo } from './app-info.model';

export class AppSettings {
  public info: AppInfo;
  public environment: string;
  public port: number;

  constructor(appInfo: AppInfo, environment: string, port: number) {
    this.info = appInfo;
    this.environment = environment;
    this.port = port;
  }
}
