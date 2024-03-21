const fs = require("fs").promises;

const writeUser = async (res, req, users) => {
  try {
    await fs.writeFile("users.json", JSON.stringify(users, null, 1));
    res.status(201).json(req.body);
    console.log(`User added successfully`);
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ error: "Error writing to file" });
  }
};

module.exports = { writeUser };
