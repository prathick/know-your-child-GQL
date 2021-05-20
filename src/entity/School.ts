import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./Room";
import { Student } from "./Student";
import { User } from "./User";

export enum SchoolType {
    DAYCARE = "Day care"
}

@ObjectType()
@Entity()
export class School extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;

    @Field()
    @Column({ unique: true, nullable: true })
    name: string;

    @Field(() => SchoolType)
    @Column({ nullable: true, type: "enum", enum: SchoolType })
    type: SchoolType;

    @Field()
    @Column({ nullable: true })
    phone: string;

    @Field()
    @Column({ nullable: true })
    address: string;

    @Field(() => [Room])
    @OneToMany(() => Room, rooms => rooms.school)
    rooms: Room[]

    @Field(() => [Student])
    @OneToMany(() => Student, students => students.school)
    students: Student[]

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}