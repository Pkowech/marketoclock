// src/health/health.module.ts
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
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

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
