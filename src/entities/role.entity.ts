import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated, IsNull } from 'typeorm';
import { User } from './user.entity';

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @Generated("uuid") id: string;

  @Column({ nullable:false,unique:true})
  names: string;

  @OneToMany(() => User, user => user.roles,{
    cascade:true
  })
  users: User[];
}
 