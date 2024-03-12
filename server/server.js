const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const images = [];

app.use(cors());
app.use(express.json());

app.get("/api/favorite", (req, res) => {
  res.status(200).json(images)
});

app.put("/api/favorite", (req, res) => {
  images.push(req.body);
  res.status(201).json(req.body);
});

app.listen(3000, () => console.log("Server is up and running..."));
