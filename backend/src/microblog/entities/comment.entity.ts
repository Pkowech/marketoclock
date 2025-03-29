import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => User, user => user.comments) // Expects 'comments' in User
  author?: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post?: Post;

  @CreateDateColumn()
  createdAt?: Date;
}