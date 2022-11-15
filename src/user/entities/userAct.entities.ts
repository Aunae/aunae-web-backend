import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './types/user.role.enum';

@Entity({ name: 'userAct' })
export class UserAct {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: '생성 날짜' })
  createAt: Date;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: '수정 날짜' })
  updateAt: Date;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: '삭제 날짜' })
  deleteAt: Date;

  @Column({ default: 0 })
  @IsInt()
  @ApiProperty({ description: '활동 점수' })
  reputation: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER,
  })
  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ description: '권한' })
  role: Role;

  @Column()
  @IsString()
  @ApiProperty({ description: '실명' })
  name: string;
}
