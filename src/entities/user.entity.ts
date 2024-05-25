import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Generated } from 'typeorm';
import { Role } from './role.entity';
import { Topic } from './topics.entity';
import { Comment } from './comment.entity';

@Entity('Users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Generated("uuid") id: string;
  
  @Column({nullable:false, unique:true})
  usernames:string; 
  
  @Column({ nullable: false, unique: true })
  emails: string;

  @Column({ nullable: false })
  passwords: string;

  @Column({ nullable: true })
  avatars: string;

  @ManyToOne(() => Role, role => role.users,{onDelete:'SET NULL',onUpdate:'CASCADE'})
  roles: Role;
 
  @OneToMany(() => Topic , topic => topic.users,{cascade:true})
  topics : Topic[] 

  @Column({ default: 0})
  isBlockeds: boolean;

  @OneToMany(() => Comment , (comment) => comment,{cascade:true}) 
  comments: Comment[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
