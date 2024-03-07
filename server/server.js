const express = require("express");

const app = express();

app.use(express.json())

const users = [];

app.post("/search", (req, res) => {
    favorite.push(req.body)
})

app.get("/favorite", (req, res) => {
    res.send("User can check favorite images here.")
})

app.listen(3000, () => console.log("Server is up and running..."));
