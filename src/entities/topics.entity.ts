import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";

@Entity('Topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  @Generated("uuid") id: string;

  @ManyToOne(() => User, user => user.topic,{onDelete:'CASCADE'})
  user: User;
  
  @OneToMany(() => Subject , (subject) => subject, {cascade:true})
  subject:Subject[]

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  avatar: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
