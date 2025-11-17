import mongoose from "mongoose";




export const conexionMongo =  async ()=>{

   try {
        await mongoose.connect(process.env.BD_URL,{dbName:"pruebatecn2desarrollobac"});
         console.log("conexion exitosa con la base de datos");

   }catch (error) {

         console.log("Error de conexion: ", error);
   }
}