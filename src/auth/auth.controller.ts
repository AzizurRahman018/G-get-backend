import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { registerDto, signInDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() user: registerDto) {
    return await this.authService.register(user);
  }
  @Public()
  @Post('signin')
  async signIn(@Body() user: signInDto) {
    return await this.authService.signIn(user);
  }

  @Patch('logout')
  async logOut(@Req() req: any) {
    await this.authService.logOut(req.user);
  }
  @Public()
  @Get('/refresh')
  async refresh(@Req() req: any) {
    console.log();
    const index = req.rawHeaders.indexOf('Authorization');
    const token = req.rawHeaders[index + 1].replace('Bearer ', '');
    return await this.authService.refresh(token);
  }
}
