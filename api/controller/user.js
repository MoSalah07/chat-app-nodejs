/* eslint-disable no-undef */

const { Router } = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = Router();

router.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ message: "User Not Found" });

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(400).send({ message: "Something went wrong" });

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      "shhhh",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "login",
      data: {
        token,
        data: {
          name: user.name,
          email: user.email,
          userId: user._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
      return res.status(401).json("name not valid");
    } else if (!email || email.trim() === "") {
      return res.status(401).json("email not valid");
    }

    const existingUser = await User.findOne(
      { email },
      { password: false, __v: false }
    );

    if (existingUser) {
      return res.status(401).json("This Account Existing Created Before");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      "shhhh",
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Registred is successfully",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

// eslint-disable-next-line no-undef
module.exports = router;
