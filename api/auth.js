const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", (req, res) => {
  res.send("Hey there from Auth!");
});

router.get("/register", (req, res) => {});

module.exports = router;
