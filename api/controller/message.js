/* eslint-disable no-undef */
const Message = require("../model/Message");

const saveMsg = async (data) => {
  try {
    const saveMessage = new Message(data);
    await saveMessage.save();
    return saveMessage;
    // return res
    //   .status(201)
    //   .json({ message: "Message Created Successfully", data: saveMessage });
  } catch (err) {
    console.log(err);
    // return res.status(400).send({ message: "Internal Server Error" });
    return err;
  }
};

const getMsg = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).send({ message: "User id required." });
    }
    const allMsg = await Message.find({
      $or: [{ "sender._id": id }, { "receiver._id": id }],
    });
    return res
      .status(200)
      .json({ data: allMsg, message: "AllMessages Is Done" });
  } catch (err) {
    return res.status(400).send({ message: "Internal Server Error" });
  }
};

const deleteMsg = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).send({ message: "User id required." });
    }
    const delMsg = await Message.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ data: delMsg, message: "AllMessages Is Done" });
  } catch (err) {
    return res.status(400).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  saveMsg,
  getMsg,
  deleteMsg,
};
