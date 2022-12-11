import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const mongo_url: string | undefined = process.env.Mongo_Url;

export const connect = () => {
  if (mongo_url) {
    mongoose.connect(mongo_url);
  }
};

const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("connected");
});

connection.on("error", (error) => {
  console.log(error);
});
