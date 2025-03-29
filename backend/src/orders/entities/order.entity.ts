import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Column('jsonb')
  items!: Product[];

  @Column()
  total!: number;

  @Column()
  status!: 'pending' | 'completed' | 'cancelled';
}