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

  public async validateUser(email: string): Promise<User | null> {
    return await this.usersService.getUserByEmail(email);
  }

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public async registerUser(user:User):Promise<User>{
    user.password = this.hash(user.password)
    return this.usersService.saveUser(user)
  }
  
  public async loginUser(
    user: User,
  ): Promise<
    { expires_in: number; access_token: string } | { status: number }
  > {
    return this.validateUser(user.email).then((userData) => {
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
