import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Topic } from "./topics.entity";
import { Comment } from "./comment.entity";

@Entity('Subjects')
export class Subject{
 @PrimaryGeneratedColumn('uuid')
 @Generated("uuid") id: string;

 @Column({nullable:false , unique:true})
 names:string;
 
 @Column({type:'text', nullable:false})
 contexts: string

 @Column({nullable:true})
 avatars: string 
 
 @ManyToOne(() => Topic , (topic) => topic.subjects,{onDelete:'SET NULL',onUpdate:'CASCADE'})
 topics: Topic

 @OneToMany(() => Comment ,(comment) => comment.subjects,{onDelete:'CASCADE',onUpdate:'CASCADE'})
 comments: Comment[]

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 createdAt: Date;
}