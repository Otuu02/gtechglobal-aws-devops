import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { Lead } from './entities/lead.entity';
import { Opportunity } from './entities/opportunity.entity';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Opportunity, Contact])],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
