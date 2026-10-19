import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'founder@gtechglobal.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SuperSecure!2024', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ required: false, description: 'TOTP code when MFA is enabled' })
  @IsOptional()
  @IsString()
  @Length(6, 6)
  mfaCode?: string;
}
