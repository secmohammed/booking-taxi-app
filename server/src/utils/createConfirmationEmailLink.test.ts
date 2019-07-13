import { createConfirmationEmailLink } from "./createConfirmationEmailLink";
import { getConnection, createConnection } from "typeorm";
import { v4 } from "uuid";
import fetch from "node-fetch";
import { User } from "../entity/User";
import { redis } from "../services/redis";

let userId: string;
describe("create confirmation email link for user", () => {
    beforeAll(async done => {
        await createConnection({
            type: "mongodb",
            database: "graphql_ts_server_testing",
            dropSchema: true,
            entities: ["src/entity/**/*.ts"],
            migrations: ["src/migrations/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"],
            useNewUrlParser: true,
            synchronize: true,
            logging: true,
            loggerLevel: "error"
        });
        const user: User = await User.create({
            email: "bob@bob.com",
            password: "123456",
            confirmed: false
        }).save();
        userId = user.id.toString();
        done();
    });
    afterAll(async done => {
        let conn = getConnection();
        await conn.close();
        done();
    });

    it("should generate a redis token for activation that lasts for 1 day for the recently registered user.", async () => {
        const url = await createConfirmationEmailLink(
            process.env.TEST_HOST as string,
            userId
        );
        const chunks = url.split("/");
        const key = chunks[chunks.length - 1];
        const value = await redis.get(key);
        expect(value).toEqual(userId);
        await redis.del(key);
    });
    it("should let user activate his account if passed token is correct", async () => {
        const token = v4();
        await redis.set(token, userId, "ex", 60 * 60 * 24);

        const url: string = `${process.env.TEST_HOST}/confirm/${token}`;
        const response = await fetch(url);
        const text: string = await response.text();
        expect(text).toEqual(
            '{"message":"account has been confirmed successfully."}'
        );
        let id = userId;
        const user = await User.findOne(id);
        if (user) {
            expect(user.confirmed).toBeTruthy();
        }
        const chunks = url.split("/");
        const key = chunks[chunks.length - 1];
        const value = await redis.get(key);
        expect(value).toBeNull();
    });
    it("shouldnt let user activate his account if passed token is incorrect", async () => {
        const response = await fetch(
            `${process.env.TEST_HOST}/confirm/fake-token`
        );
        const text: string = await response.text();
        expect(text).toEqual('{"message":"Invalid token has been passed."}');
    });
});
