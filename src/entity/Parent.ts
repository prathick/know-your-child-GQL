import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./Student";
import { User } from "./User";


@ObjectType()
@Entity()
export class Parent extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @OneToOne(() => User, { nullable: false })
    @JoinColumn()
    user: User;

    @Field()
    @Column({ nullable: true })
    firstName: string;

    @Field()
    @Column({ nullable: true })
    lastName: string;

    @Field()
    @Column({ nullable: true })
    address: string;

    @Field()
    @Column({ nullable: true })
    phone: string;

    @Field(() => [Student])
    @OneToMany(() => Student, student => student.parent, { nullable: true })
    student: Student[];

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

}