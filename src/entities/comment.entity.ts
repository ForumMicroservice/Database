import { Column, Entity, Generated, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";
import { Topic } from "./topics.entity";

@Entity('Comments')
export class Comment{

@PrimaryGeneratedColumn('uuid')
@Generated("uuid") id: string;
 
@ManyToOne(() => User, (user)=> user.comment)
user: User
example:string

@OneToMany(() =>Subject , (subject) => subject.comment)
subject: Subject[]

@ManyToOne(() =>Comment, (comment) => comment.replies)
rootComment:Comment

@OneToMany(() => Comment, (comment) => comment.rootComment)
replies:Comment[]

@Column({nullable:true})
comment: string;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;
}