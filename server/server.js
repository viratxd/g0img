const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.router");
const userRouter = require("./routers/user.router");
const imagesRouter = require("./routers/images.router");
const connectDB = require("./db");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routers
app.use("/api/users", usersRouter);
app.use("/api/user", userRouter);
app.use("/api/images", imagesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
