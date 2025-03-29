import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Post } from '../../microblog/entities/post.entity';
import { Comment } from '../../microblog/entities/comment.entity';
import { Like } from '../../microblog/entities/like.entity';
import { ProductImage } from '../../products/entities/product-image.entity';
import { Category } from '../../products/entities/category.entity';
import { JoinColumn } from 'typeorm';


@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column()
  role!: string;

  @Column()
  full_name!: string;

  @Column({ nullable: true })
  business_name?: string;

  @Column({ name: 'seller_id', nullable: true })
  sellerId?: string;

  @OneToMany(() => Product, (product) => product.seller)
  products!: Product[];

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];

  @ManyToOne(() => Category)
  category?: Category;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' }) // Explicitly define the foreign key column
  seller?: User;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  rating!: number;

  @Column()
  password!: string;

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

}