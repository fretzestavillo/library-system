import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LBSService } from './lbs.service';
import { LBSInput, LBSStatus } from '../tools/lbs.type';
import { LBSEntity } from '../tools/lbs.entity';

@Controller('lbs')
export class LBSController {
  constructor(private readonly lbsService: LBSService) {}

  @Post()
  postData(@Body() lbsInput: LBSInput): Promise<LBSEntity> {
    return this.lbsService.postData(lbsInput);
  }

  @Get()
  getData(): Promise<LBSEntity[]> {
    return this.lbsService.getData();
  }

  @Delete()
  deleteById(@Query('id') id: string): Promise<void> {
    return this.lbsService.deleteById(id);
  }

  @Patch()
  updateLbsStatus(@Query('id') id: string, @Body() lbsStatus: LBSStatus) {
    return this.lbsService.updateLbsStatus(id, lbsStatus);
  }
}
