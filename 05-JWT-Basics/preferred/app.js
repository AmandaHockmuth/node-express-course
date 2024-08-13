require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/main-routes");
const port = process.env.PORT || 3000;
const app = express();

//     Middleware
app.use(express.json());
app.use("/api/v1", mainRouter);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Sandbox app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
