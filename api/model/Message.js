/* eslint-disable no-undef */
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    sender: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    receiver: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    replyMsg: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
