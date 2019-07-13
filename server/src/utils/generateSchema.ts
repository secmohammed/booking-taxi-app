import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import * as path from "path";
import { readdirSync, lstatSync } from "fs";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
export const generateSchema = () => {
    const schemas: GraphQLSchema[] = [];

    const isDirectory = (folder: string) =>
        lstatSync(path.join(__dirname, "../graphql/") + folder).isDirectory();

    const folders = readdirSync(path.join(__dirname, "../graphql")).filter(
        isDirectory
    );

    folders.forEach(folder => {
        const { resolvers } = require(`../graphql/${folder}/resolvers`);

        const typeDefs = importSchema(
            path.join(__dirname, `../graphql/${folder}/schema.graphql`)
        );

        schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
    });
    return mergeSchemas({ schemas });
};
