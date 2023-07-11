import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import productRouter from './routers/products.router';
import userRouter from './routers/user.router';
import { dbConnect } from "./configs/database.config";
dbConnect();

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

const port = 8080;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});