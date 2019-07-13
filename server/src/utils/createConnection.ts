import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
export default async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({ ...connectionOptions, name: "default" });
};
