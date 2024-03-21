const { readUsers } = require("../fs/readUsers");
const { writeUser } = require("../fs/writeUser");

const getUser = async (req, res) => {
  const users = await readUsers();
  const user = users.find((user) => user.user == req.params.userName);
  if (user) {
    res.status(200).json(user);
    console.log(`User ${user.user}'s data loaded into the server successfully`);
  } else {
    console.log(`User ${req.params.userName} not found`);
  }
};

const postUser = async (req, res) => {
  const users = await readUsers();
  let existingUser = users.find((user) => user.user === req.params.userName);

  if (!existingUser) {
    const newUser = {
      user: req.body.userName,
      userIdWithGoogle: req.body.userIdWithGoogle,
      userIdWithGithub: req.body.userIdWithGithub,
      favoriteImages: [],
    };
    users.push(newUser);
    await writeUser(res, req, users);
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

    await writeUser(res, req, updatedUsers);
  }
};

module.exports = { getUser, postUser };
