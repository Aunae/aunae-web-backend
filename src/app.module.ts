import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { AppConfigModule } from './configs/app/app.config.module';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './configs/database/database.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    CommentsModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
