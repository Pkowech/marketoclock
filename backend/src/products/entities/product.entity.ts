import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('int', { default: 0 })
  stock!: number;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => User, 'products')
  seller!: User;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category!: Category;

  @OneToMany(() => ProductImage, image => image.product, { cascade: true })
  images!: ProductImage[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  rating!: number;

  @Column('int', { default: 0 })
  ratingCount!: number;

  @Column('int', { default: 0 })
  viewCount!: number;

  @Column('int', { default: 0 })
  purchaseCount!: number;

  @Column('int', { default: 0 })
  wishlistCount!: number;

  @Column('int', { default: 0 })
  commentCount!: number;

  @Column('int', { default: 0 })
  shareCount!: number;

  @Column('int', { default: 0 })
  reportCount!: number;

  @Column('int', { default: 0 })
  questionCount!: number;

  @Column('int', { default: 0 })
  answerCount!: number;

  @Column('int', { default: 0 })
  disputeCount!: number;

  @Column('int', { default: 0 })
  returnCount!: number;

  @Column('int', { default: 0 })
  refundCount!: number;

  @Column('int', { default: 0 })
  cancellationCount!: number;

  @Column('int', { default: 0 })
  feedbackCount!: number;

  @Column('int', { default: 0 })
  reviewCount!: number;

  @Column('int', { default: 0 })
  likeCount!: number;

  @Column('int', { default: 0 })
  dislikeCount!: number;

  @Column('int', { default: 0 })
  favoriteCount!: number;

  @Column('int', { default: 0 })
  followCount!: number;
  

}