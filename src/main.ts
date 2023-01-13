import { Logger,RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigType, ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { LogSingleton, ACTION_TYPE } from 'loglib-nodejs';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import serverConfig from './config/server.config'

async function bootstrap() {
  // LogSingleton.setup({
  //   ENGINE_NAME: process.env.LOG_ENGINE_NAME || '',
  //   RESPONSE_CODE_PATH: 'response_code',
  //   RESPONSE_DESC_PATH: 'response_desc',
  //   LOG_TO_CONSOLE: true,
  // });
  // LogSingleton.setLogLevel(LogSingleton.LogLevel[process.env.LOG_LEVEL]);


  Logger.log('env',JSON.stringify(process.env))

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/App-HealthCheck', method: RequestMethod.GET }]
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CORS_ORIGINS.split(','),
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const svConfig: ConfigType<typeof serverConfig> = app.get(serverConfig.KEY);

  await app.listen(svConfig.port);
  Logger.log(`Business service (bs) - protection is starting and listening at http://localhost:${svConfig.port}`);

} (() => bootstrap())()
