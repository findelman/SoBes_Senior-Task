import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import User from './user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    try {
      return await this.authService.register(user);
    } catch (error) {
      if (error.message === 'email существует') {
        throw new BadRequestException(
          'Пользователь с таким email уже существует',
        );
      } else {
        throw new Error('Internal server error');
      }
    }
  }
}

// test
