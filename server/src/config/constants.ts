import { config } from "dotenv";
config({ path: "./.env" });

const { PORT, NODE_ENV, HOST, MONGO_URI } = process.env;
export { PORT, NODE_ENV, HOST, MONGO_URI };
