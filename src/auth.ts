import { AuthChecker } from "type-graphql";
import { MyContext } from "./types/types";

export const auth: AuthChecker<MyContext> = (
    { context }
) => {
    if (!context.req.session.user) return false;
    return true;
};