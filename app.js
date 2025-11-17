import express from "express";
import dotenv from "dotenv";
import { conexionMongo } from "./src/config/db.js";


const app = express();
dotenv.config();



const port = process.env.PORT;
conexionMongo();

 app.get("/",(req, res) =>{
     res.send("server words")
 });



app.listen(port, ()=>{
    console.log(`El servidor  esta ejecutandose en http://localhost:${port}`)
});