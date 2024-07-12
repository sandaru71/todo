import express from "express";
import "dotenv/config";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./src/Routes/user.routes.js";
import todoRouter from "./src/Routes/todo.routes.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/todos", todoRouter);

//PORT
const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
