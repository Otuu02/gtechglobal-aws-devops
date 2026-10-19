import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty() @IsString() @Length(2, 200) title!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() content?: string;
  @ApiProperty({ enum: ['sop','policy','contract','prd','architecture','note'] })
  @IsIn(['sop','policy','contract','prd','architecture','note']) type!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsUUID() folderId?: string;
  @ApiProperty() @IsUUID() ownerId!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() fileUrl?: string;
  @ApiProperty({ type: [String], required: false })
  @IsOptional() @IsArray() tags?: string[];
}
