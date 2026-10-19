import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty() @IsString() @Length(2, 120) name!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsEmail() email?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() company?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() source?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsNumberString() estimatedValue?: string;
  @ApiProperty() @IsUUID() ownerId!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() nextAction?: string;
}
