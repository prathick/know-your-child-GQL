import bcryt from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Parent } from '../entity/Parent';
import { School } from '../entity/School';
import { User, userType } from "../entity/User";
import { MyContext } from '../types/types';
import { RegisterInput } from "./inputTypes";

// @ObjectType()
// class UserType {
//     @Field()
//     school?: School

//     @Field()
//     parent?: Parent
// }


@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async register(
        @Arg("data") { email, password, role }: RegisterInput
    ): Promise<User | null> {
        const hashedPassword = await bcryt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword, role }).save();
        if (role === userType.School) {
            await School.create({ user }).save();
        } else if (role === userType.Parent) {
            await Parent.create({ user }).save()
        }

        return user;
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } })

        if (!user) return null;

        const valid = await bcryt.compare(password, user.password);

        if (!valid) return null;

        ctx.req.session.user = user;

        return user;
    }
}