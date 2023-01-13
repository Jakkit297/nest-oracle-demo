import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectEntityManager, TypeOrmModule } from '@nestjs/typeorm';
import oracledb = require('oracledb');
import { EntityManager } from 'typeorm';


@Module({
    imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'oracle',
        //   host: configService.get<string>('ORACLE_HOST'),
        //   port: configService.get<number>('ORACLE_PORT'),
        // database: configService.get<string>('ORACLE_DB'),
          username: configService.get<string>('ORACLE_USERNAME'),
          password: configService.get<string>('ORACLE_PASSWORD'),
          connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA=(SERVICE_NAME = xe)))",
          entities: [],
          synchronize: true,
          poolSize: 10,
        }),
        inject: [ConfigService],
      }),
    ],
  })
  

export class DatabaseModule {

    // constructor(
    //     @InjectEntityManager()
    //     private readonly manager: EntityManager
    //   ) {}

    //   public query(): any 
}