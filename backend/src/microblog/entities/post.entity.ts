import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @ManyToOne(() => User, user => user.posts)
  author?: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];

  @OneToMany(() => Like, like => like.post)
  likes?: Like[];

  @Column({ default: 0 })
  likesCount?: number;

  @Column({ default: 0 })
  commentsCount?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
//     if (categoryId) {
//       where.category = categoryId;

//     }
//     if (minPrice && maxPrice) {
//       where.price = Between(minPrice, maxPrice);