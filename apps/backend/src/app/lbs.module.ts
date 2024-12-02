import { Module } from '@nestjs/common';
import { LBSController } from './lbs.controller';
import { LBSService } from './lbs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LBSEntity } from '../tools/lbs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LBSEntity])],
  controllers: [LBSController],
  providers: [LBSService],
})
export class LBSModule {}
