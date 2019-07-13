import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { invalidLogin, confirmEmailError } from "./errorMessages";
import config from "../../config";
import * as jwt from "jsonwebtoken";
const errorResponse = [
    {
        path: "email",
        message: invalidLogin
    }
];

const resolvers: ResolverMap = {
    Query: {
        bye2: () => "bye"
    },
    Mutation: {
        login: async (
            _,
            { email, password }: GQL.ILoginOnMutationArguments
        ) => {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return [
                    {
                        message: invalidLogin
                    }
                ];
            }

            if (!user.confirmed) {
                return [
                    {
                        path: "email",
                        message: confirmEmailError
                    }
                ];
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return errorResponse;
            }
            let token = jwt.sign(
                {
                    _id: user.id
                },
                config.JWT_SECRET as string
            );
            return [
                {
                    path: "token",
                    message: token
                }
            ];
        }
    }
};
export default resolvers;
