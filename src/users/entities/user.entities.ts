import { IsEmail, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserAct } from './userAct.entities';

@Entity({ name: 'user' })
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'username' })
  username: string;

  @Column()
  @IsEmail()
  @ApiProperty({ description: 'email' })
  email: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'password' })
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'coverImg' })
  coverImg?: string;

  @OneToOne(() => UserAct)
  @JoinColumn()
  userAct: UserAct;
}
