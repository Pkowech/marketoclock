// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsPositive, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  stock!: number;

  @ApiProperty()
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images!: string[];
}