import { Redis } from "ioredis";
interface User {
    _id: string;
    iat: number;
}
export type Resolver = (
    parent: any,
    args: any,
    context: {
        user: User;
        redis: Redis;
        url: string;
    },
    info: any
) => any;
export interface ResolverMap {
    [key: string]: {
        [key: string]: Resolver;
    };
}
