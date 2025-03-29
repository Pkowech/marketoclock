// src/swagger/swagger.config.ts
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Market O\'Clock API')
  .setDescription('API documentation for Market O\'Clock')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

;

