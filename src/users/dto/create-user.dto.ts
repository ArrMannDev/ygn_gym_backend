import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.USER;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  specialties?: string[];

  @IsOptional()
  socialLinks?: Record<string, string>;

  @IsString()
  @IsOptional()
  image?: string;
}
