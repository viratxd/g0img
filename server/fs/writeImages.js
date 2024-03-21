const fs = require("fs").promises;

const writeImages = async (res, req, users) => {
  try {
    await fs.writeFile("users.json", JSON.stringify(users, null, 1));
    res.status(200).json(req.body);
    console.log(`Liked image added to the list successfully`);
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ error: "Error writing to file" });
  }
};

module.exports = { writeImages };