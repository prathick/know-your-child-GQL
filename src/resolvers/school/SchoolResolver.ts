// import { MyContext } from 'src/types/types';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { School } from "../../entity/School";
import { MyContext } from "../../types/types";
import { SchoolDetails } from "../inputTypes";


@Resolver()
export class SchoolResolver {

    @Authorized()
    @Query(() => School)
    async school(
        @Ctx() ctx: MyContext
    ): Promise<School | null> {
        const { user } = ctx.req.session;
        const school = await School.findOne({ user }, { relations: ['rooms', 'user', 'rooms.students'] });
        if (!school) return null;
        return school;
    }

    @Authorized()
    @Mutation(() => School)
    async schoolDetails(
        @Arg("data") { name, address, type, phone }: SchoolDetails,
        @Ctx() ctx: MyContext
    ): Promise<School> {
        const currentUser = ctx.req.session.user
        const updatedSchoolDetails = await School.createQueryBuilder().update().set({ name, address, type, phone }).where("userId = :userId", { userId: currentUser.id }).returning("*").execute();
        return updatedSchoolDetails.raw[0];
    }
}