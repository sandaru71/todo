const express = require("express");
require("dotenv/config");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./src/Routes/user.routes.js");
const todoRouter = require("./src/Routes/todo.routes.js");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

// Routes
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/todos", todoRouter);

// Port
const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
