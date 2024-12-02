import { Controller, Get } from '@nestjs/common';
import { LBSService } from './lbs.service';

@Controller()
export class LBSController {
  constructor(private readonly lbsService: LBSService) {}

  @Get()
  getData() {
    return this.lbsService.getData();
  }
}
