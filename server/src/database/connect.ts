import { connect } from "mongoose";
import { MONGO_URI } from "../config/constants";

const databaseConnection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await connect(MONGO_URI as string, {
        dbName: `leftmenu`,
      });

      if (connection) {
        console.log(`Connected to ${MONGO_URI}`);
        resolve(connection);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { databaseConnection };
