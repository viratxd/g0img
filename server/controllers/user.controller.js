const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });

    if (user) {
      res.status(200).json(user);
      console.log(
        `User ${user.userName}'s data loaded into the server successfully`
      );
    } else {
      console.log(`User ${req.params.userName} not found`);
    }
  } catch (error) {
    console.error("Error reading user from database:", error);
    res.status(500).send("Error fetching user data");
  }
};

const postUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ userName: req.body.userName });

    if (!existingUser) {
      const newUser = new User({
        isAuthenticated: req.body.isAuthenticated,
        userName: req.body.userName,
        userIdWithGoogle: req.body.userIdWithGoogle || "",
        userIdWithGithub: req.body.userIdWithGithub || "",
      });

      await newUser.save();
      res.status(201).json(newUser);
      console.log(
        `New user ${newUser.userName} created and saved successfully`
      );
    } else {
      if (req.body.userIdWithGoogle && !existingUser.userIdWithGoogle) {
        existingUser.userIdWithGoogle = req.body.userIdWithGoogle;
      }
      if (req.body.userIdWithGithub && !existingUser.userIdWithGithub) {
        existingUser.userIdWithGithub = req.body.userIdWithGithub;
      }

      await existingUser.save();
      res.status(200).json(existingUser);
      console.log(`User ${existingUser.userName} updated successfully`);
    }
  } catch (error) {
    console.error("Error saving or updating user:", error);
    res.status(500).json({ error: "Error saving or updating user" });
  }
};

module.exports = { getUser, postUser };
