import { Column, Entity, Generated, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";

@Entity('Comments')
export class Comment {

@PrimaryGeneratedColumn('uuid')
@Generated("uuid") id: string;
 
@ManyToOne(() => User, (user)=> user.comments,{onDelete:'SET NULL',onUpdate:'CASCADE'})
users: User

@ManyToOne(() =>Subject , (subject) => subject.comments,{onDelete:'SET NULL',onUpdate:'CASCADE'})
subjects: Subject;

@ManyToOne(() =>Comment, (comment) => comment.replies,{onDelete:'SET NULL',onUpdate:'CASCADE'})
rootComments:Comment

@OneToMany(() => Comment, (comment) => comment.rootComments,{cascade:true})
replies:Comment[]

@Column({type: 'text' , nullable:true})
comments: string;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createSdAt: Date;
}