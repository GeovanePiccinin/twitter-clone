import "./env.js";
import express from "express";
import winston from "winston";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import tweetsRouter from "./routes/tweet.route.js";
import cookieParser from "cookie-parser";

//import { connect } from "./repositories/mongo.db.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "twitter-clone.log" }),
  ],
  format: combine(label({ label: "twitter-clone" }), timestamp(), myFormat),
});

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tweet", tweetsRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message} - ${err.status}`);
  res.status(err.status || 400).send({ error: err.message });
});

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
