
// src/microblog/entities/like.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';

@Entity('likes')
@Unique(['user', 'post'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.likes)
  user?: User;

  @ManyToOne(() => Post, post => post.likes, { onDelete: 'CASCADE' })
  post?: Post;

  @CreateDateColumn()
  createdAt?: Date;
}