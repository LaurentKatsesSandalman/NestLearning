import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';

@Controller('/users')
export class UsersController {

constructor(private readonly userService: UsersService){}

@Get(':id')
getUserbyId(@Param() params){
    return this.userService.getUser(params.id);
}

@Post()
createUser(@Body() user: User){
    return this.userService.saveUser(user);
}











}
