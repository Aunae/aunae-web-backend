import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './types/user.role.enum';
import { BaseTimeEntity } from '../../common/entities/baseTime.entity';

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
