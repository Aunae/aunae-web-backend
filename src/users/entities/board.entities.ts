import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import {User} from './user.entities'
  @Entity()
  
  export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(()=>User,(user)=>user.boards)
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
  