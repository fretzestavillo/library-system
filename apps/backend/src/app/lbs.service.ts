import { Injectable } from '@nestjs/common';

@Injectable()
export class LBSService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
