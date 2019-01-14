const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Hey there from Auth!");
});

router.post("/register", (req, res) => {
  const name = req.body.data.name;
  const email = req.body.data.email;
  const password = req.body.data.password;
  const contact = req.body.data.contact;
  const location = req.body.data.location;
  Person.findOne({ email: email })
    .then(person => {
      if (person) return res.json({ message: 0 });
      else {
        const newPerson = new Person({
          name: name,
          email: email,
          password: password,
          contact: contact,
          location: location
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;

            // Storing hash in your password DB.
            newPerson.password = hash;
            newPerson
              .save()
              .then(res.json({ message: 1 }))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
  console.log(req.body);
  email = req.body.data.email;
  password = req.body.data.password;
  if (!req.cookies.auth_t) {
    Person.findOne({ email: email })
      .then(person => {
        if (!person) {
          res.json({ message: 0 });
        }
        bcrypt
          .compare(password, person.password)
          .then(isCorrect => {
            if (isCorrect) {
              const payload = {
                email: email,
                password: password
              };
              jsonwt.sign(
                payload,
                key,
                { expiresIn: 90000000 },
                (err, token) => {
                  res.cookie("auth_t", token, { maxAge: 90000000 });
                  res.json({ message: 1, name: person.name });
                }
              );
            } else {
              res.json({ message: 0 });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    res.json({ message: 0 });
  }
});

router.post("/logout", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      res.clearCookie("auth_t");
      req.logout();
      res.json({ message: 1 });
    } else {
      res.json({ message: 0 });
    }
  });
});

module.exports = router;
