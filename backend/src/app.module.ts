import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module'; // Added
import { ProductsModule } from './products/products.module';
// import * as Joi from 'joi'; // Uncomment if you decide to use Joi for validation

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Joi validation commented out as per your update; uncomment and install Joi if needed later
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      //   DATABASE_USERNAME: Joi.string().required(),
      //   DATABASE_PASSWORD: Joi.string().required(),
      //   DATABASE_NAME: Joi.string().required(),
      //   JWT_SECRET: Joi.string().required(),
      //   JWT_EXPIRATION: Joi.string().default('1d'),
      // }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const, // Explicit type for TypeScript
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'AU110s/6081/2021PG'),
        database: configService.get<string>('DATABASE_NAME', 'postgres'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Set to false in production as noted
        logging: process.env.NODE_ENV === 'development', // Optional: Enable logging in dev
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Optional: SSL settings for production
      }),
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule, // Added to enable categories functionality
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule], // Export ConfigModule if needed in other modules
  // providers: [ConfigService], // Uncomment if you need to inject ConfigService in this module
  // controllers: [AppController], // Uncomment if you need to use AppController in this module
})
export class AppModule {}