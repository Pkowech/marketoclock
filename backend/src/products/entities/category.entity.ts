import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @OneToMany(() => Product, product => product.category)
  products!: Product[];

  constructor(name: string) {
    this.name = name;
    // Removed: this.products = [];
  }
}