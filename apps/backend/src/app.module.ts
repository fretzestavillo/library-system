import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LBSModule } from './app/lbs.module';
import { LBSEntity } from './tools/lbs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.16.1',
      port: 5432,
      username: 'file',
      password: 'file',
      database: 'file',
      entities: [LBSEntity],
      synchronize: true,
    }),
    LBSModule,
  ],
})
export class AppModule {}
