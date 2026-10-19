import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateApprovalDto {
  @ApiProperty() @IsString() @Length(2, 200) title!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() type!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsNumberString() amount?: string;
  @ApiProperty() @IsUUID() requesterId!: string;
  @ApiProperty() @IsUUID() approverId!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() entityType?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUUID() entityId?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsDateString() dueAt?: string;
}
