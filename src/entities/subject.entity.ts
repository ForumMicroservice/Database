import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Topic } from "./topics.entity";
import { Comment } from "./comment.entity";

@Entity('Subjects')
export class Subject{
 @PrimaryGeneratedColumn('uuid')
 @Generated("uuid") id: string;

 @Column({nullable:false , unique:true})
 name:string;
 
 @Column({nullable:true})
 avatar: string 
 
 @ManyToOne(() => Topic , (topic) => topic.subject)
 topic: Topic

 @ManyToOne(() => Comment ,(comment) => comment.subject )
 comment: Comment

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 createdAt: Date;
}