import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { getMongoRepository } from "typeorm";
const resolvers: ResolverMap = {
    Query: {
        me: (_, __, { user }) => {
            if (user) {
                const userRepository = getMongoRepository(User);
                let id = user._id;
                return userRepository.findOne(id);
            }
            return null;
        }
    }
};
export default resolvers;
