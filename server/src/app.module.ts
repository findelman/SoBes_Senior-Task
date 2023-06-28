import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authorization/auth.module';

@Module({
  imports: [MongooseModule.forRoot(`${process.env.MOGO_DBt}`), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// test