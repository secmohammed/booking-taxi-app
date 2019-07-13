// npm packages.
import { GraphQLServer } from "graphql-yoga";
import confirmEmail from "../routes/confirmEmail";
// local files.
import { redis } from "../services/redis";
import { authenticate } from "../middlewares/auth";
import config from "../config";
import { generateSchema } from "../utils/generateSchema";
export const startServer = async () => {
    const server = new GraphQLServer({
        schema: generateSchema(),
        context: ({ request, response }) => ({
            request,
            response,
            redis,
            url: config.APP_URL
        }),
        middlewares: [authenticate]
    });

    const cors = {
        credentials: true,
        origin: "*"
    };
    server.express.get("/confirm/:token", confirmEmail);
    const app = await server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : 4000
    });

    return app;
};
