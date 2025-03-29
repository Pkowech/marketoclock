// backend/src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './products/entities/category.entity';
import { Post } from './microblog/entities/post.entity';
import { Comment } from './microblog/entities/comment.entity';
import { Like } from './microblog/entities/like.entity';
import { ProductImage } from './products/entities/product-image.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10), // Default to '5432' as string
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'AU110s/6081/2021PG',
  database: process.env.DB_NAME || 'postgres',
  synchronize: false,
  logging: true,
  entities: [
    User,
    Product,
    Category,
    Post,
    Comment,
    Like,
    ProductImage,
  ],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
});

// Only initialize if run directly (for migrations)
if (require.main === module) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected successfully.');
    })
    .catch((error) => {
      console.error('Database connection error:', error);
    });
}