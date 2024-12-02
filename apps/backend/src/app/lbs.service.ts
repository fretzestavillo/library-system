import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LBSEntity } from '../tools/lbs.entity';
import { Repository } from 'typeorm';
import { LBSInput, LBSStatus } from '../tools/lbs.type';

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
    lbsEntity.bookAvailability = 'available';
    lbsEntity.statusButton = 'ISSUE';
    await this.lbsEntity.save(lbsEntity);
    return lbsEntity;
  }

  async getData(): Promise<LBSEntity[]> {
    return this.lbsEntity.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    try {
      const result = await this.lbsEntity.delete({ id });
      console.log(result);
    } catch (err) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateLbsStatus(id: string, lbsStatus: LBSStatus): Promise<void> {
    const found = await this.lbsEntity.findOne({ where: { id } });
    found.bookAvailability = lbsStatus.bookAvailability;
    found.statusButton = lbsStatus.statusButton;
    await this.lbsEntity.save(found);
  }
}
