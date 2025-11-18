import mongoose from "mongoose";

export const conexionMongo = async ()=>{
    try {
        await mongoose.connect(process.env.BD_URL,{dbName:"pruebatec2desarrolloback"});
        console.log("Conexion exitosa con la basede datos");

    } catch (error) {
        console.error("Error de conexion: ", error);

    }

}
    
export default conexionMongo