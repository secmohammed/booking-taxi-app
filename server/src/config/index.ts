import * as dotenv from "dotenv";
dotenv.config();
export default {
    APP_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    FRONT_END_URL: process.env.FRONT_END_URL,
    JWT_SECRET: process.env.JWT_SECRET
};
