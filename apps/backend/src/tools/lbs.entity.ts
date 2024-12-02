import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LBSEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  bookName: string;

  @Column()
  bookAuthor: string;

  @Column()
  bookPages: string;

  @Column()
  bookPrice: string;

  @Column()
  bookAvailability: string;

  @Column()
  statusButton: string;
}
