// backend/src/cart/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => User)
  user?: User;

  @ManyToMany(() => Product)
  items?: Product[];
}
