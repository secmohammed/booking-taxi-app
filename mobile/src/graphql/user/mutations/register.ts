import { gql } from "apollo-boost";

export default gql`
    mutation Register(
        $password: String!
        $email: String!
        $firstName: String!
        $lastName: String!
    ) {
        register(
            data: {
                password: $password
                email: $email
                firstName: $firstName
                lastName: $lastName
            }
        ) {
            email
        }
    }
`;
