const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const { favoriteImageSchema } = require("./schemas/favoriteImage.schema");
const { userSchema } = require("./schemas/user.schema");

const app = express();

let users = [];

const writeFile = async () => {
  await fs.writeFile("users.json", JSON.stringify(users, null, 1));
};

const getDataFromFile = async () => {
  try {
    const fileData = await fs.readFile("users.json");
    users = JSON.parse(fileData);
    console.log("Users data loaded successfully");
  } catch (error) {
    console.error("Error reading file:", error);
  }
};
getDataFromFile();

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
  console.log("Users data loaded successfully");
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
    try {
      writeFile();
      res.status(201).json(req.body);
      console.log("User successfully added");
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    console.log("User already exists");
  }
});

app.put("/api/users", (req, res) => {
  console.log(req.body);
  const { error } = favoriteImageSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json(error);
  }
  
  const user = users.find((user) => user.user == req.body.userName);
  if (user) {
    user.favoriteImages = req.body.imageData;
    try {
      writeFile();
      res.status(200).json(req.body.imageData);
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    console.log("User not found");
  }
});

app.listen(3000, () => console.log("Server is up and running..."));
