import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty() @IsString() @Length(2, 200) title!: string;
  @ApiProperty() @IsNumberString() amount!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() currency?: string;
  @ApiProperty() @IsString() category!: string;
  @ApiProperty() @IsUUID() ownerId!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() businessUnit?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() receiptUrl?: string;
}
