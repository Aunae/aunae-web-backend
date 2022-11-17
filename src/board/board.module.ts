import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  exports: [TypeOrmModule],
})
export class BoardModule {}
