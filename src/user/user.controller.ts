import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { wishList } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('wishlist')
  async addWishlist(@Body() data: wishList) {
    return await this.userService.addWishlist(data);
  }
  // @Get('wishlist')
  // async wishList(@Body() data: any) {
  //   return await this.userService.getWishlist(data.userId);
  // }
  @Delete('wishlist')
  async removeWishlist(@Body() data: any) {
    return await this.userService.removeWishlist(data);
  }
}
