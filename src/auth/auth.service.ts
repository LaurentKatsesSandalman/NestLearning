import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async authUser(email: string): Promise<User | null> {
    //private: on part du principe que cette fonction ne peut être utilisé que par la fonction "login" qui est aussi dans la classe
    return await this.usersService.getUserByEmail(email);
  }

  private hash(password): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public async register(user):Promise<any>{
    user.password = this.hash(user.password)
    return this.usersService.saveUser(user)
  }
  
  public async login(
    user: User,
  ): Promise<
    { expires_in: number; access_token: string } | { status: number }
  > {
    return this.authUser(user.email).then((userData) => {
      if (!userData || userData.password != this.hash(user.password)) {
        return { status: 404 };
      }
      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
      };
    });
  }
}
