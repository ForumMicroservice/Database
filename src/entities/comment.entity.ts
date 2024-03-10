import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";
import { Topic } from "./topics.entity";

@Entity('Comments')
export class Comment{

@PrimaryGeneratedColumn('uuid')
id: string;
 
@ManyToOne(() => User, (user)=> user.comment)
user: User

@OneToMany(() =>Subject , (subject) => subject.comment)
subject: Subject[]

@Column()
comment: string;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;
}