import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Req, Res, Query, Param, Body } from '@nestjs/common';
import { FilterService } from 'src/filter/filter.service';
import { User } from '../entities/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('/hello')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly filterService: FilterService,
  ) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  filterUserByName(@Body() body: User[], @Query('name') name: string): User[] {
    return this.filterService.filterUsersByName(body, name);
    //body.filter((item) => item.name === name);
  }
}
