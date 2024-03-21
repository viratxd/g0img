const fs = require("fs").promises;

const readUsers = async () => {
  let users = [];
  try {
    const fileData = await fs.readFile("users.json");
    users = JSON.parse(fileData);
    console.log("All users data loaded into the array successfully");
    return users;
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

module.exports = { readUsers };
