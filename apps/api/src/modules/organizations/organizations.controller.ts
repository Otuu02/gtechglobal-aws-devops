import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgs: OrganizationsService) {}

  @Post() create(@Body() dto: CreateOrganizationDto) { return this.orgs.create(dto); }
  @Get()  findAll() { return this.orgs.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.orgs.findOne(id); }
}
