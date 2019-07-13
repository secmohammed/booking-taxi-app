import { getConnection, getMongoRepository } from "typeorm";
import { User } from "../../entity/User";
import createConnection from "../../utils/createConnection";
import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import { hash } from "bcryptjs";
import loginResolver from "../login/resolvers";
import resolvers from "./resolvers";
import * as request from "request-promise-native";
import { GraphQLServer } from "graphql-yoga";
import * as jwt from "jsonwebtoken";
import config from "../../config";
const authenticate = async (
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

const loginTypeDefs = importSchema(
    path.join(__dirname, "/../login/schema.graphql")
);
const loginSchema = makeExecutableSchema({
    typeDefs: loginTypeDefs,
    resolvers: loginResolver
});
const loginMutation = `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            path
            message
        }
    }
`;
const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const meQuery = `
    {
        me {
            id
            email
        }
    }
`;

describe("me query", () => {
    beforeAll(async done => {
        await createConnection();
        done();
    });
    afterAll(async done => {
        let conn = getConnection();
        await conn.close();
        done();
    });

    it("cant get user if not logged in", async () => {
        let token = jwt.sign(
            {
                _id: "someobjectidsads"
            },
            config.JWT_SECRET as string
        );

        const server = new GraphQLServer({
            schema,
            context: ({ request, response }) => {
                request.headers.authorization = token;
                return {
                    request,
                    response
                };
            },
            middlewares: [authenticate]
        });
        const http = await server.start({ port: 0 });
        const { port } = http.address();
        const uri = `http://localhost:${port}/`;
        const body = await request({
            uri,
            method: "POST",
            json: true,
            body: { query: meQuery }
        }).promise();
        expect(body).toMatchObject({
            data: {
                me: null
            }
        });
    });
    it("should get the current user", async () => {
        const userRepository = getMongoRepository(User); // or connection.getMongoManager
        let email: string = "mohammedosama@ieee.org";
        let password: string = await hash("123456", 10);
        let confirmed: boolean = true;
        const user = await userRepository.save({
            email,
            password,
            confirmed
        });
        const loginResponse = await graphql(
            loginSchema,
            loginMutation,
            null,
            {},
            { email, password: "123456" }
        );
        const server = new GraphQLServer({
            schema,
            context: ({ request, response }) => {
                request.headers.authorization = loginResponse.data!.login[0].message;
                return {
                    request,
                    response
                };
            },
            middlewares: [authenticate]
        });
        const http = await server.start({ port: 0 });
        const { port } = http.address();
        const uri = `http://localhost:${port}/`;
        const body = await request({
            uri,
            method: "POST",
            json: true,
            body: { query: meQuery }
        }).promise();
        expect(body).toMatchObject({
            data: {
                me: {
                    email: user.email
                }
            }
        });
    });
});
