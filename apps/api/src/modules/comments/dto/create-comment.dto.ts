import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty() @IsString() @Length(1, 40) entityType!: string;
  @ApiProperty() @IsUUID() entityId!: string;
  @ApiProperty() @IsUUID() authorId!: string;
  @ApiProperty() @IsString() @Length(1, 5000) body!: string;
}
