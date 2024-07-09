/* eslint-disable no-undef */
const mongoose = require("mongoose");
const PATH =
  "mongodb+srv://chat-july-24:6pRELIkl2NAzLNwS@cluster0.pcijkvu.mongodb.net/Chat_React_NodeJs_July_24?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(PATH);
    console.log("connect mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMongoDB;
