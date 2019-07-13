import { getMongoRepository } from "typeorm";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import * as yup from "yup";
import { createConfirmationEmailLink } from "../../utils/createConfirmationEmailLink";

import { formatYupError } from "../../utils/formatYupError";
const schema = yup.object().shape({
    email: yup
        .string()
        .min(3)
        .max(255)
        .email(),
    password: yup
        .string()
        .min(3)
        .max(255)
});
const resolvers: ResolverMap = {
    Query: {
        bye: () => "bye"
    },
    Mutation: {
        register: async (
            _,
            { email, password }: GQL.IRegisterOnMutationArguments,
            { url }
        ) => {
            try {
                await schema.validate(
                    { email, password },
                    { abortEarly: false }
                );
            } catch (err) {
                return formatYupError(err);
            }
            const userRepository = getMongoRepository(User); // or connection.getMongoManager

            const userAlreadyExists = await userRepository.findOne({
                email
            });
            if (userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: "already exists."
                    }
                ];
            }
            const user: User = await userRepository.save({
                email,
                password
            });
            await createConfirmationEmailLink(url, user.id.toString());
            return null;
        }
    }
};
export default resolvers;
