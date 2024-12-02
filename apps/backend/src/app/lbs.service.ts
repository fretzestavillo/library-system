import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LBSEntity } from '../tools/lbs.entity';
import { Repository } from 'typeorm';
import { LBSInput } from '../tools/lbs.type';

@Injectable()
export class LBSService {
  constructor(
    @InjectRepository(LBSEntity) private lbsEntity: Repository<LBSEntity>
  ) {}

  async postData(lbsInput: LBSInput): Promise<LBSEntity> {
    const lbsEntity = new LBSEntity();
    lbsEntity.bookName = lbsInput.bookName;
    lbsEntity.bookAuthor = lbsInput.bookAuthor;
    lbsEntity.bookPages = lbsInput.bookPages;
    lbsEntity.bookPrice = lbsInput.bookPrice;
    await this.lbsEntity.save(lbsEntity);
    return lbsEntity;
  }

  async getData(): Promise<LBSEntity[]> {
    return this.lbsEntity.find();
  }

  async deleteById(id: string): Promise<void> {
    try {
      const result = await this.lbsEntity.delete({ id });
      console.log(result);
    } catch (err) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
