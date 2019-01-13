const express = require("express");
const mongoose = require("mongoose");
const db = require("./setup/url").mongoURL;
const key = require("./setup/url").secret;
const bodyparser = require("body-parser");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hey there!");
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected Succesfully."))
  .catch(err => console.log(err));

app.use(
  session({
    secret: key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800000, // 1 Week
      httpOnly: true
    }
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
