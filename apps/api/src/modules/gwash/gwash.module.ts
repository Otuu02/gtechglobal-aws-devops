import { Module } from '@nestjs/common';
import { GwashService } from './gwash.service';
import { GwashController } from './gwash.controller';

@Module({
  controllers: [GwashController],
  providers: [GwashService],
  exports: [GwashService],
})
export class GwashModule {}
