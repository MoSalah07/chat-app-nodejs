/* eslint-disable no-undef */
const { Router } = require("express");
const { getMsg, deleteMsg } = require("./message");

const router = Router();

router.get("/:id", getMsg);
router.delete("/:id", deleteMsg);

module.exports = router;
