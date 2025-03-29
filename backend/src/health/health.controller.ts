// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
// Compare this snippet from backend/src/app.module.ts:
// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { HealthController } from './health/health.controller';
// import { HealthModule } from './health/health.module';
// import { UserModule } from './user/user.module';
// import { User } from './user/user.entity';
// import { ProductModule } from './product/product.module';
// import { Product } from './product/product.entity';
// import { CategoryModule } from './category/category.module';
// import { Category } from './category/category.entity';
// import { PostModule } from './post/post.module';
// import { Post } from './post/post.entity';
// import { CommentModule } from './comment/comment.module';