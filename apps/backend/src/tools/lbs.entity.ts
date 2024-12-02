import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LBSEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  date: string;
}
