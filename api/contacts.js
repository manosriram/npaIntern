const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Hey there from Contacts!");
});

router.get("/findContact/:name", (req, res) => {
  const name = req.params.name;
  Person.findOne({ name })
    .then(person => {
      if (!person) {
        res.json({ message: -1 });
      } else {
        res.json({ students: person, message: 1 });
      }
    })
    .catch(err => console.log(err));
});

router.post("/addContact/:name", (req, res) => {
  const name = req.params.name;
  let t;
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      Person.findOne({ email: user.email })
        .then(person1 => {
          Person.findOne({ name: name })
            .then(person2 => {
              for (t = 0; t < person1.contacts.length; t++) {
                if (person1.contacts[t].user == person2.id) {
                  console.log("User already added!");
                  return res.json({ status: 0 });
                }
              }
              person1.contacts.unshift({ user: person2.id });
              console.log("Contact added!");
              person1.save();
              return res.json({ message: 1 });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
