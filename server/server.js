const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { favoriteSchema } = require("./schemas/favorite.schema");
const { userSchema } = require("./schemas/user.schema");

const app = express();

const users = [];

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/api/users", (req, res) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(error);
  }
  const existingUser = users.find((user) => user.user === req.body.userName);

  if (!existingUser) {
    const newUser = { user: req.body.userName, favoriteImages: [] };
    users.push(newUser);
    res.status(201).json(req.body);
    console.log("User successfully added");
  } else {
    console.log("User already exists");
  }
});

app.put("/api/users", (req, res) => {
  const user = users.find((user) => user.user == req.body.userName);
  if (user) {
    user.favoriteImages = req.body.imageData;
  } else {
    console.log("User not found");
  }

  res.status(200).json(req.body.imageData);
});

app.listen(3000, () => console.log("Server is up and running..."));
