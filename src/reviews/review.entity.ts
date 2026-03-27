import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  platformId: string;

  @Column({ type: 'text', default: '' })
  screenshotData: string;

  @Column()
  screenshotMimeType: string;

  @Column({ default: 'pending' })
  status: ReviewStatus;

  @Column({ nullable: true })
  adminComment?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
