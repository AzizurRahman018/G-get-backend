import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './products.service';
import { Products as productModel } from '@prisma/client';
import { Public } from 'src/auth/decorator/auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  // get all products
  @Public()
  @Get()
  async getProducts(): Promise<productModel[]> {
    return this.productsService.products();
  }
  @Public()
  @Get('flashsale')
  async getFlashSale(): Promise<productModel[]> {
    return this.productsService.flashSale();
  }
  // get single product by id
  @Public()
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<productModel> {
    return this.productsService.product({ id: Number(id) });
  }

  // get Product by category
  @Public()
  @Get(':category')
  async getCategory(
    @Param('category') category: string,
  ): Promise<productModel[] | productModel> {
    return this.productsService.productByCategory({
      category: { has: category },
    });
  }
}
