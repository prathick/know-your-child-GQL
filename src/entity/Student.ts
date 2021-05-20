import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Parent } from "./Parent";
import { Room } from "./Room";
import { School } from "./School";

@ObjectType()
@Entity()
export class Student extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true, nullable: false })
    firstName: string;

    @Field()
    @Column({ unique: true, nullable: false })
    lastName: string;

    @Field()
    @Column({ nullable: true })
    image: string;

    @Field()
    @Column({ nullable: true })
    notes: string;

    @Field()
    @Column({ nullable: true })
    allergies: string;

    @Field()
    @Column({ nullable: true })
    medication: string;

    @Field(() => [Room])
    @ManyToMany(() => Room, room => room.students, { cascade: ["insert", "update"] })
    rooms: Room[]

    @Field(() => School)
    @ManyToOne(() => School, school => school.students)
    @JoinColumn()
    school: School;

    @Field(() => Parent)
    @ManyToOne(() => Parent, { nullable: true })
    @JoinColumn()
    parent: Parent;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}