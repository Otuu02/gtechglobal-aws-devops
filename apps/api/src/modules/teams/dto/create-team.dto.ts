import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty() @IsString() @Length(2, 120) name!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsUUID() departmentId!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUUID() leadId?: string;
}
