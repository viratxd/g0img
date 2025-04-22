const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.query.auth0Id });

    if (user) {
      res.status(200).json(user);
      console.log(
        `User ${req.body.auth0Id}'s data loaded into the server successfully`
      );
    } else {
      console.log(`User ${req.body.auth0Id} not found`);
    }
  } catch (error) {
    console.error("Error reading user from database:", error);
    res.status(500).send("Error fetching user data");
  }
};

const postUser = async (req, res) => {
  try {
    const { email, auth0Id } = req.body;

    let existingUser = await User.findOne({ auth0Id: auth0Id });

    if (!existingUser) {
      const newUser = new User({
        email: email,
        auth0Id: auth0Id,
      });

      await newUser.save();
      res.status(201).json(newUser);
      console.log(
        `New user ${newUser.auth0Id} created and saved successfully`
      );
    } else {
     /*  if (req.body.userIdWithGoogle && !existingUser.userIdWithGoogle) {
        existingUser.userIdWithGoogle = req.body.userIdWithGoogle;
      }
      if (req.body.userIdWithGithub && !existingUser.userIdWithGithub) {
        existingUser.userIdWithGithub = req.body.userIdWithGithub;
      } */

      await existingUser.save();
      res.status(200).json(existingUser);
      console.log(`User ${existingUser.auth0Id} updated successfully`);
    }
  } catch (error) {
    console.error("Error saving or updating user:", error);
    res.status(500).json({ error: "Error saving or updating user" });
  }
};

module.exports = { getUser, postUser };
