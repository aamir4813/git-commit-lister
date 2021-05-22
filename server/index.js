import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import homeRoute from "./routes/home.js";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.MONGODB_URI;
// console.log(CONNECTION_URL);
// db connect ...
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo is Connected !"))
  .catch((err) => console.log(err));

app.use("/", homeRoute);

// for heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
