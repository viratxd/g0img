const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { favoriteSchema } = require("./schemas/favorite.schema");

const app = express();

let images = [];

app.use(cors());
app.use(express.json());

app.get("/api/favorite", (req, res) => {
  res.status(200).json(images);
});

app.post("/api/favorite", (req, res) => {
  const { error } = favoriteSchema.validate(req.body, {abortEarly: false});

  if (error) {
    console.log(error);
    return res.status(400).json(error);
  }

  images.push(req.body);
  res.status(201).json(req.body);
});

app.put("/api/favorite", (req, res) => {
  const removedImage = req.body;
  images = images.filter((image) => image.link !== removedImage.link);
  res.status(200).json(images);
});

app.listen(3000, () => console.log("Server is up and running..."));
