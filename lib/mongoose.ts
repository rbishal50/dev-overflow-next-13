import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongo db url!!!");
  }

  if (isConnected) {
    return console.log("Mongo db is already Connected!!!");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("Mongo db is connected!!!");
  } catch (error) {
    console.log("Mongo db connection failure!!!", error);
  }
};
