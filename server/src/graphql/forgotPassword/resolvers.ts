import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { createForgotPasswordEmailLink } from "../../utils/createForgotPasswordEmailLink";
import config from "../../config";
const resolvers: ResolverMap = {
    Query: {
        dummy: () => "dummy"
    },
    Mutation: {
        sendForgotPasswordEmail: async (
            _,
            { email }: GQL.ISendForgotPasswordEmailOnMutationArguments
        ) => {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return false;
            }

            if (!user.confirmed) {
                return false;
            }

            await createForgotPasswordEmailLink(user.id.toString());
            if (config.APP_ENV !== "test") {
            }
            return true;
        }
    }
};
export default resolvers;
