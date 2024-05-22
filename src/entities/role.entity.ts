import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from 'typeorm';
import { User } from './user.entity';

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Generated("uuid") id: string;

  @Column({unique:true})
  name: string;

  @OneToMany(() => User, user => user.role,{
    cascade:true
  })
  users: User[];
}
