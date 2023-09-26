const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.URI;
const userRouter = require("./Routes/user.route");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err, "Database not Connected");
  });
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
