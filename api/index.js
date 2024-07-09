/* eslint-disable no-undef */
const express = require("express");
const http = require("http");
const socketInit = require("./socket");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userController = require("./controller/user");
const messageController = require("./controller/messageController");

app.use("/user", userController);
app.use("/message", messageController);

const server = http.createServer(app);

const connectMongoDB = require("./db/db");

socketInit(server);

connectMongoDB()
  .then(() => {
    server.listen(5000, () => {
      // socket(server);
      console.log(`server Login In Port 5000`);
    });
  })
  .then((err) => console.log(err));
