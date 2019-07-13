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
describe("login test", () => {
    beforeEach(async done => {
        await createConnection();
        done();
    });
    afterEach(async done => {
        let conn = getConnection();
        await conn.close();
        done();
    });
    it("shouldnt let user login if email and password arent valid", async done => {
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
    it("shouldnt let user login if email is incorrect", async done => {
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
                login: [
                    {
                        message: confirmEmailError,
                        path: "email"
                    }
                ]
            }
        });
        done();
    });
    it("shouldnt let user login if password is incorrect", async done => {
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
    it("should let user login if credentials are correct and create a token", async function(done) {
        const userRepository = getMongoRepository(User); // or connection.getMongoManager
        let email: string = "mohammedosama@ieee.org";
        let password: string = await hash("123456", 10);
        let confirmed: boolean = true;
        await userRepository.insertOne({
            email,
            password,
            confirmed
        });
        const response = await graphql(
            schema,
            mutation,
            null,
            {},
            { email, password: "123456" }
        );
        expect(response).toMatchObject({
            data: {
                login: [
                    {
                        path: "token"
                    }
                ]
            }
        });
        done();
    });
});
