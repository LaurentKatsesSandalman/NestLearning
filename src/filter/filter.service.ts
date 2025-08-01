import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.model';

@Injectable()
export class FilterService {
    filterUsersByName(list:User[],name:string): User[]{
        return list.filter((user:User) => user.name === name)
    } 
}
