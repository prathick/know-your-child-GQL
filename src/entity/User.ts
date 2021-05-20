import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum userType {
    School = "School",
    Parent = "Parent",
    Staff = "Staff",
    ApprovedPickUp = "Approved Pick up"
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Field(() => userType)
    @Column({ nullable: false, type: "enum", enum: userType })
    role: userType;

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

}