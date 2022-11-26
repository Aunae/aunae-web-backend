import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entities';
import { UserModule } from '../user/user.module';
import { BoardService } from './board.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Board])],
  exports: [TypeOrmModule],
  providers: [BoardService],
})
export class BoardModule {}
