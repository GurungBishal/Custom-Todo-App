import mongoose from "mongoose";

export async function connect() {
  const dbUri = process.env.CONNECTION_URI ?? "";

  return mongoose
    .connect(dbUri)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
