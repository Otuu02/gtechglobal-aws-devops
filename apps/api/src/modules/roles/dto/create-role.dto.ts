import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty() @IsString() @Length(2, 60) name!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty({ type: [String], required: false })
  @IsOptional() @IsArray() @ArrayUnique() @IsUUID('4', { each: true })
  permissionIds?: string[];
}
