import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { TodoModule } from 'src/authorization/user/todo/todo.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    TodoModule,
    PassportModule,
    JwtModule.register({
      secret: 'AsfQWerdgs',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}