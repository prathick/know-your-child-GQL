import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { School } from "./School";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Room extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ nullable: false, unique: true })
    name: string;

    @Field()
    @Column({ nullable: true })
    numberOfStudents: number;

    @Field(() => School)
    @ManyToOne(() => School, school => school.rooms)
    @JoinColumn()
    school: School;

    @Field(() => [Student])
    @ManyToMany(() => Student, student => student.rooms, { cascade: ["insert", "update"] })
    @JoinTable()
    students: [Student];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}