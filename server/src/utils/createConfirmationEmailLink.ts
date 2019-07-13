import { redis } from "../services/redis";

import { v4 } from "uuid";

export const createConfirmationEmailLink = async (
    url: string,
    userId: string
) => {
    const id = v4();
    await redis.set(id, userId, "ex", 60 * 60 * 24);
    return `${url}/confirm/${id}`;
};
