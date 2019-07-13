import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import resolvers from "./resolvers";
import { getConnection, getMongoRepository } from "typeorm";
import { User } from "../../entity/User";
import createConnection from "../../utils/createConnection";

const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
const mutation = `
    mutation register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            path
            message
        }
    }
`;
describe("register test", () => {
    beforeEach(async done => {
        await createConnection();
        done();
    });
    afterEach(async done => {
        let conn = getConnection();
        await conn.close();
        done();
    });
    it("shouldnt let user register if email and password arent valid", async done => {
        let email: string = "mohammedosama";
        let password: string = "1";
        expect(
            await graphql(schema, mutation, null, {}, { email, password })
        ).toEqual({
            data: {
                register: [
                    {
                        path: "email",
                        message: "email must be a valid email"
                    },
                    {
                        path: "password",
                        message: "password must be at least 3 characters"
                    }
                ]
            }
        });
        done();
    });
    it("shouldnt let user register if email already exists", async done => {
        const userRepository = getMongoRepository(User); // or connection.getMongoManager
        let email: string = "mohammedosama@ieee.org";
        let password: string = "123456";
        await userRepository.insertOne({
            email,
            password
        });
        expect(
            await graphql(schema, mutation, null, {}, { email, password })
        ).toEqual({
            data: {
                register: [
                    {
                        path: "email",
                        message: "already exists."
                    }
                ]
            }
        });
        done();
    });
    it("should let user register if email doesnt exist yet.", async done => {
        const email: string = "john@gmail.com";
        const password: string = "boboIsMyPsswrd";
        // 1st arg: The schema, 2nd arg: The mutation, 3rd arg: the reolvers (but they are already in the schema)
        // 4th arg: The context (here nothing), 5th arg: The variables
        const res = await graphql(
            schema,
            mutation,
            null,
            {},
            { email, password }
        );
        expect(res).toEqual({
            data: {
                register: null
            }
        });
        done();
    });
});
