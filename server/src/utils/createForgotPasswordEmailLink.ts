import { redis } from "../services/redis";

import { v4 } from "uuid";
import config from "../config";
export const createForgotPasswordEmailLink = async (userId: string) => {
    const id = v4();
    await redis.set(id, userId, "ex", 60 * 60 * 24);
    return `${config.APP_URL}/forgot-password/${id}`;
};
