import * as jwt from "jsonwebtoken";
import config from "../config";

export const authenticate = async (
    resolve: any,
    root: any,
    args: any,
    context: any,
    info: any
) => {
    let user;
    try {
        user = jwt.verify(
            context.request.get("Authorization"),
            config.JWT_SECRET as string
        );
        context.user = user;
    } catch (e) {
        context.user = null;
    }
    const result = await resolve(root, args, context, info);
    return result;
};
