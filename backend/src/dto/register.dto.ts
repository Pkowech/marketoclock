import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsString()
  role!: string;

  @IsString()
  fullName!: string; // Use camelCase

  @IsString()
  businessName!: string; // Use camelCase
}
