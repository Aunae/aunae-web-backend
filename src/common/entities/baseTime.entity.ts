import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseTimeEntity {
  @ApiProperty({ description: '생성 날짜' })
  @IsDate()
  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @ApiProperty({ description: '수정 날짜' })
  @IsDate()
  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @ApiProperty({ description: '삭제 날짜' })
  @IsDate()
  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt: Date;
}
