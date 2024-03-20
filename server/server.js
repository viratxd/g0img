const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const { validate } = require("./validate");
const { favoriteImageSchema } = require("./schemas/favoriteImage.schema");
const { userSchema } = require("./schemas/user.schema");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

const getDataFromFile = async () => {
  try {
    const fileData = await fs.readFile("users.json");
    users = JSON.parse(fileData);
    console.log("All users data loaded into the array successfully");
  } catch (error) {
    console.error("Error reading file:", error);
  }
};
getDataFromFile();

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
  console.log("All users data loaded into the server successfully");
});

app.get("/api/user/:userName", (req, res) => {
  const user = users.find((user) => user.user == req.params.userName);
  if (user) {
    res.status(200).json(user);
    console.log(`User ${user.user}'s data loaded into the server successfully`);
  } else {
    console.log(`User with ID ${req.params.userId} not found`);
  }
});

app.post("/api/user/:userName", validate(userSchema), (req, res) => {
  let existingUser = users.find((user) => user.user === req.params.userName);

  if (!existingUser) {
    const newUser = {
      user: req.body.userName,
      userIdWithGoogle: req.body.userIdWithGoogle,
      userIdWithGithub: req.body.userIdWithGithub,
      favoriteImages: [],
    };
    users.push(newUser);

    try {
      const writeFile = async () => {
        await fs.writeFile("users.json", JSON.stringify(users, null, 1));
      };
      writeFile();
      res.status(201).json(req.body);
      console.log(`User ${newUser.user} added successfully`);
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    if (!existingUser.userIdWithGoogle && req.body.userIdWithGoogle) {
      console.log("userIdWithGoogle missing");
      existingUser = {
        ...existingUser,
        userIdWithGoogle: req.body.userIdWithGoogle,
      };
    }
    if (!existingUser.userIdWithGithub && req.body.userIdWithGithub) {
      console.log("userIdWithGithub missing");
      existingUser = {
        ...existingUser,
        userIdWithGithub: req.body.userIdWithGithub,
      };
    }
    if (existingUser.userIdWithGoogle && existingUser.userIdWithGithub) {
      console.log(`User ${existingUser.user} already exists`);
    }

    const updatedUsers = users.map((user) => {
      if (user.user === existingUser.user) {
        return existingUser;
      } else {
        return user;
      }
    });

    try {
      const writeFile = async () => {
        await fs.writeFile("users.json", JSON.stringify(updatedUsers, null, 1));
      };
      writeFile();
      res.status(201).json(req.body);
      console.log(`User ${existingUser.user} updated successfully`);
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  }
});

app.put("/api/user/:userName", validate(favoriteImageSchema), (req, res) => {
  const user = users.find((user) => user.user == req.params.userName);
  if (user) {
    user.favoriteImages = req.body;
    try {
      const writeFile = async () => {
        await fs.writeFile("users.json", JSON.stringify(users, null, 1));
      };
      writeFile();
      res.status(200).json(req.body);
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ error: "Error writing to file" });
    }
  } else {
    console.log(`User not found`);
  }
});

app.listen(3000, () => console.log("Server is up and running..."));
