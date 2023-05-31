import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // sending fine status
  @Get()
  async hello(): Promise<string> {
    return 'hi i am running fine!';
  }
}
