import { startServer } from "../startServer";
import createConnection from "../createConnection";
export const setup = async () => {
    const app = await startServer();
    await createConnection();
    const { port } = app.address();
    process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
