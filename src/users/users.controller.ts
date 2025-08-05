import { Controller, Param, Get, Post, Put, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';

@Controller('users')
export class UsersController {

constructor(private userService: UsersService){}

@Get()
getAllUsers(){
    return this.userService.getUsers();
}

@Get(':id')
getUserbyId(@Param() params){
    return this.userService.getUser(params.id);
}

@Post()
createUser(@Body() user: User){
    return this.userService.saveUser(user);
}

@Put()
updateUser(@Body() user: User){
    return this.userService.saveUser(user);
}

@Delete()
deleteUserById(@Param() params){
    return this.userService.deleteUser(params.id);
}











}
