import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':search')
  async getHello(@Param('search') search:string): Promise<string> {
    return this.appService.getHello(search);
   }
}
