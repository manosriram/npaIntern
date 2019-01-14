const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
    res.send("Hey there from Contacts!");
})

router.get("/findContact/:name", (req, res) => {
    const name = req.params.name;
    Person.findOne({name})
    .then(person => {
        if (!person) {
            res.json({message: 0});
        } else {
            res.json({students:person,message:1})
        }
    })
    .catch(err => console.log(err));
})

module.exports = router;