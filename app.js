import express from "express";
import dotenv from "dotenv";
import { conexionMongo } from "./src/config/db.js";
import ruletaRoutes from "./src/routes/ruletaRoutes.js"



const app = express();
dotenv.config();
app.use(express.json());
const port = process.env.PORT;
conexionMongo();


 app.get("/",(req, res) =>{
     res.send(" API Ruleta")
 });

app.use("/api", ruletaRoutes)

app.listen(port, ()=>{
    console.log(`El servidor  esta ejecutandose en http://localhost:${port}`)
});