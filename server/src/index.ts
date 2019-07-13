import { startServer } from "./utils/startServer";
import createConnection from "./utils/createConnection";

createConnection().then(() => {
    startServer();
});
