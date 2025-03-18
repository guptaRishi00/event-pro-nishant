const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user.routes");
const clientRouter = require("./routes/client.routes");

const connectToDb = require("./db/db");

const app = express();

connectToDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", userRouter);
app.use("/client", clientRouter);

module.exports = app;
