import { IsInt, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from '../../common/entities/baseTime.entity';
import { User } from './user.entities';

@Entity({ name: 'useract' })
export class UserAct extends BaseTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @Column({ default: 0 })
  @IsInt()
  @ApiProperty({ description: '활동 점수' })
  reputation: number;

  @JoinColumn()
  @OneToOne((type) => User)
  user: User;

  @Column()
  @IsString()
  @ApiProperty({ description: '실명' })
  name: string;
}
