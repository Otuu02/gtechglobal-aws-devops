import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Feature } from './entities/feature.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Feature) private readonly features: Repository<Feature>,
  ) {}

  list() { return this.products.find({ order: { createdAt: 'DESC' } }); }

  create(data: Partial<Product>) {
    return this.products.save(this.products.create(data));
  }

  async featuresOf(productId: string) {
    const product = await this.products.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product ${productId} not found`);
    return this.features.find({ where: { productId }, order: { createdAt: 'DESC' } });
  }

  addFeature(data: Partial<Feature>) {
    return this.features.save(this.features.create(data));
  }
}
