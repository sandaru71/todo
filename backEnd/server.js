import express from 'express';
import mysql2 from 'mysql2';
import 'dotenv/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

//app.use(express.json());

import todos from './src/Routes/todo.routes.js';

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));

app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Hello World!")
});

app.use('/api', todos);

//PORT
const port = process.env.APP_PORT ;

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});