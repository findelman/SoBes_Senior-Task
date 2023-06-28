import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './authorization/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://greofresh:sggfBsgoURLSTN8Y@bccadmin.rfmguga.mongodb.net/sobes?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
