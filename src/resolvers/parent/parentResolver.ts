import { Parent } from "../../entity/Parent";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ParentDetails } from "../inputTypes";
import { MyContext } from "../../types/types";


@Resolver()
export class ParentResolver {

    @Authorized()
    @Mutation(() => Parent)
    async updateParentDetails(
        @Arg("data") { firstName, lastName, address, phone }: ParentDetails,
        @Ctx() ctx: MyContext
    ) : Promise<Parent> {
        const currentUser = ctx.req.session.user;
        const updatedParentDetails = await Parent.createQueryBuilder().update().set({ firstName, lastName, address, phone }).where("userId = :userId", { userId: currentUser.id }).returning("*").execute();
        return updatedParentDetails.raw[0];
    }
}