import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  trainerId: number;

  @IsDateString()
  @IsNotEmpty()
  schedule: string;

  @IsInt()
  @IsNotEmpty()
  capacity: number;
}
