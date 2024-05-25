import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Subject } from "./subject.entity";

@Entity('Topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  @Generated("uuid") id: string;

  @ManyToOne(() => User, users => users.topics,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  users: User;
  
  @OneToMany(() => Subject , (subject) => subject, {cascade:true})
  subjects:Subject[]

  @Column({ nullable: false, unique: true })
  names: string;

  @Column({ nullable: false })
  descriptions: string;

  @Column({ nullable: true })
  avatars: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
