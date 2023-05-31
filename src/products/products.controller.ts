import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './products.service';
import { Products as productModel } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  // get all products
  @Get('products')
  async getProducts(): Promise<productModel[]> {
    return this.productsService.products();
  }
  @Get('products/flashsale')
  async getFlashSale(): Promise<productModel[]> {
    return this.productsService.flashSale();
  }
  // get single product by id
  @Get('products/:id')
  async getProductById(@Param('id') id: number): Promise<productModel> {
    return this.productsService.product({ id: Number(id) });
  }

  // get Product by category
  @Get(':category')
  async getCategory(
    @Param('category') category: string,
  ): Promise<productModel[] | productModel> {
    return this.productsService.productByCategory({
      category: { has: category },
    });
  }
}
