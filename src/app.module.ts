import { DatabaseModule } from './configs/database/database.module';
import { AppConfigModule } from './configs/app/app.config.module';
import { UserAct } from './user/entities/userAct.entities';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
