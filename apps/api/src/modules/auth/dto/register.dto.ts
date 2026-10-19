import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'founder@gtechglobal.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SuperSecure!2024', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'Ada' })
  @IsString()
  @Length(1, 60)
  firstName!: string;

  @ApiProperty({ example: 'Okafor' })
  @IsString()
  @Length(1, 60)
  lastName!: string;
}
