import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('SERVER_PORT') || 3000;
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  // app.use(function (req, res, next) {
  //   // Website you wish to allow to connect
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  //   // Request methods you wish to allow
  //   res.setHeader(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  //   );

  //   // Request headers you wish to allow
  //   res.setHeader(
  //     'Access-Control-Allow-Headers',
  //     'X-Requested-With,content-type',
  //   );

  //   // Set to true if you need the website to include cookies in the requests sent
  //   // to the API (e.g. in case you use sessions)
  //   res.setHeader('Access-Control-Allow-Credentials', true);

  //   // Pass to next layer of middleware
  //   next();
  // });
  await app.listen(port);
}
bootstrap();
