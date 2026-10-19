import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ApproveDto {
  @ApiProperty({ enum: ['approved', 'rejected'] })
  @IsIn(['approved', 'rejected']) decision!: 'approved' | 'rejected';

  @ApiProperty({ required: false })
  @IsOptional() @IsString() comments?: string;
}
