import express, { Router } from "express";
const app = express();
import mongoose from "mongoose";
import router from "./routes/user-routes";

app.use(express.json());
app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://vs8824394430:mongodbvikash100@cluster0.h9aq4rk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected succesffully at port 5000"))
  .catch((err) => console.log(err));
