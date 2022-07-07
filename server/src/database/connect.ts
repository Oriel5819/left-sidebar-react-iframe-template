import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

function connect() {
  const DATABASE_URI = process.env.databaseURI as string;

  return mongoose
    .connect(DATABASE_URI, {})
    .then(() => console.log("Database connected"))
    .catch((error) => {
      console.log(error.message);
    });
}

export default connect;
