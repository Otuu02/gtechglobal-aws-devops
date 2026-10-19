import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty() @IsString() @Length(2, 120) name!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() slug?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() industry?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() logoUrl?: string;
}
