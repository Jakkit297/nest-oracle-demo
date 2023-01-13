import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database/database.module';
import { TestController } from './modules/test/test.controller';
import serverConfig from './config/server.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig],
      envFilePath: process.cwd() + '/configurations/configuration.ini',
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [TestController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}