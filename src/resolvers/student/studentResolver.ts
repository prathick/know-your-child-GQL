import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Parent } from "../../entity/Parent";
import { School } from "../../entity/School";
import { Student } from "../../entity/Student";
import { User } from "../../entity/User";
import { MyContext } from "../../types/types";
import { AddStudent } from '../inputTypes';


@Resolver()
export class StudentResolver {

    @Query(() => [Student])
    async students(): Promise<Student[]> {
        const allStudents = await Student.find({ relations: ["rooms", "rooms.students", "rooms.school"] });
        return allStudents;
    }

    @Authorized()
    @Mutation(() => Student)
    async addStudentToSchool(
        @Arg("data") { firstName, lastName }: AddStudent,
        @Ctx() ctx: MyContext
    ): Promise<Student | null> {
        const currentUser = ctx.req.session.user;
        const school = await School.findOne({ user: currentUser })
        const newStudent = await Student.create({ firstName, lastName, school: school }).save();
        return newStudent;
    }

    @Authorized()
    @Mutation(() => Student, { nullable: true })
    async addParentToStudent(
        @Arg("studentId") studentId: string,
        @Arg("parentEmail") parentEmail: string
    ): Promise<Student | null> {
        const userId = await User.findOne({ email: parentEmail });
        const parent = await Parent.findOne({ user: userId });
        console.log(parent)

        if (!parent) return null;

        const updatedStudent = await Student.createQueryBuilder().update().set({ parent }).where("id = :studentId", { id: studentId }).returning('*').execute();
        return updatedStudent.raw[0];
    }
}