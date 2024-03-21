const { readUsers } = require("../fs/readUsers");

const getAllUsers = async (req, res) => {
  const users = await readUsers();
  console.log(users);
  res.status(200).json(users);
  console.log("All users data loaded into the server successfully");
};

module.exports = { getAllUsers };
