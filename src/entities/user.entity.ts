import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Topic } from './topics.entity';
import { Comment } from './comment.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
 
  @OneToMany(() => Topic , topic => topic.user)
  topic : Topic[] 

  @Column({ default: false })
  isBlocked: boolean;

  @OneToMany(() => Comment , (comment) => comment)
  comment: Comment[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
