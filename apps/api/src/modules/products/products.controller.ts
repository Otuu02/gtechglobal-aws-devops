import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Feature } from './entities/feature.entity';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get() list() { return this.svc.list(); }
  @Post() create(@Body() body: Partial<Product>) { return this.svc.create(body); }

  @Get(':id/features') features(@Param('id') id: string) { return this.svc.featuresOf(id); }
  @Post(':id/features') addFeature(@Param('id') id: string, @Body() body: Partial<Feature>) {
    return this.svc.addFeature({ ...body, productId: id });
  }
}
