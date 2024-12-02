import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LBSEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookName: string;

  @Column()
  bookAuthor: string;

  @Column()
  bookPages: string;

  @Column()
  bookPrice: string;
}
