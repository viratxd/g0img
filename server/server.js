const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.router")
const userRouter = require("./routers/user.router")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/users", usersRouter)
app.use("/api/user", userRouter)

app.listen(3000, () => console.log("Server is up and running..."));
