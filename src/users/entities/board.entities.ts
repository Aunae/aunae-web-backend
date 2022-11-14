import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'user' })
  @Unique(['username'])
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    author: string;

    @Column()
    title: string;
  
    @Column()
    thumnail: string;
  
    @Column()
    description: string;

    @Column()
    viewCount: Number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  