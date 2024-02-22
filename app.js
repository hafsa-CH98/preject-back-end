const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Username = require("./models/usernameSchema");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send('<p>Hello hello hello!</p>')
  res.sendFile("./views/home.html", { root: __dirname });
});

console.log(process.env.MONGODB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://chidmihafsa4:${process.env.MONGODB_PASSWORD}@cluster0.hmxiy8t.mongodb.net/mydata?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  const username = new Username(req.body)
  username
  .save()
  .then(result => {
    res.redirect("/")
  })
  .catch(err => {
    console.log(err)
  });
});
