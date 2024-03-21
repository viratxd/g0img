const { readUsers } = require("../fs/readUsers");
const { writeImages } = require("../fs/writeImages");

const putImages = async (req, res) => {
  const users = await readUsers();
  const user = users.find((user) => user.user == req.params.userName);
  if (user) {
    user.favoriteImages = req.body;
    await writeImages(res, req, users);
  } else {
    console.log(`User not found`);
  }
};

module.exports = { putImages };
