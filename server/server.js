const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

let images = [];

app.use(cors());
app.use(express.json());

app.get("/api/favorite", (req, res) => {
  res.status(200).json(images);
});

app.post("/api/favorite", (req, res) => {
  images.push(req.body);
  res.status(201).json(req.body);
});

app.put("/api/favorite", (req, res) => {
  const removedImage = req.body
  images = images.filter((image) => image.link !== removedImage.link);
  res.status(200).json(images);
});

app.listen(3000, () => console.log("Server is up and running..."));
