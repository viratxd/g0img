const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { favoriteSchema } = require("./schemas/favorite.schema");
const { usersSchema } = require("./schemas/users.schema");

const app = express();

const users = [];
let images = [];

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/api/users", (req, res) => {
  const { error } = usersSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(error);
  }
  const existingUser = users.find(
    (user) => user.userName === req.body.userName
  );
  console.log(users);
  if (!existingUser) {
    users.push(req.body);
    res.status(201).json(req.body);
    console.log("User successfully added");
  } else {
    console.log("User already exists");
  }
});

app.get("/api/favorite/:userId", (req, res) => {
  res.status(200).json(images);
});

app.post("/api/favorite/:userId", (req, res) => {
  const { error } = favoriteSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(error);
  }
  images.push(req.body);
  res.status(201).json(req.body);
});

app.put("/api/favorite/:userId", (req, res) => {
  const removedImage = req.body;
  images = images.filter((image) => image.link !== removedImage.link);
  res.status(200).json(images);
});

app.listen(3000, () => console.log("Server is up and running..."));
