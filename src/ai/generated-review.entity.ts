import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('generated_reviews')
export class GeneratedReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  platform: string;

  @Column()
  productName: string;

  @Column()
  tone: string;

  @Column({ type: 'text' })
  reviewData: string; // JSON stringified AI response

  @Column({ default: 'generated' })
  status: string; // generated | submitted | approved

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
