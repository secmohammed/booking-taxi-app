import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import resolvers from "./resolvers";
import { getConnection, getMongoRepository } from "typeorm";
import createConnection from "../../utils/createConnection";

import { User } from "../../entity/User";
import { invalidLogin, confirmEmailError } from "./errorMessages";
import { hash } from "bcryptjs";

const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
const mutation = `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            path
            message
        }
    }
`;
describe("forgot password test", () => {
    beforeEach(async done => {
        await createConnection();
        done();
    });
    afterEach(async done => {
        let conn = getConnection();
        await conn.close();
        done();
    });
    it("should create a token for the user and email to the user.", async done => {
        let email: string = "mohammedosama";
        let password: string = "1";
        expect(
            await graphql(schema, mutation, null, {}, { email, password })
        ).toEqual({
            data: {
                login: [
                    {
                        message: invalidLogin,
                        path: null
                    }
                ]
            }
        });
        done();
    });
});
