import { Ruleta } from "../models/ruleta.js"


export const createRuleta = async () => {
    const ruleta = new Ruleta();

    await ruleta.save();
    return ruleta;
};

export const openRuleta = async (id) => {
    const ruleta = await Ruleta.findById(id);
    if (!ruleta) {
        throw new Error("No se encontro la Ruleta");
    }
    if (ruleta.status === "open") {
        return ruleta;
    }

    ruleta.status = "open";
    await ruleta.save();
 
    return ruleta;
};
  // validar y guardar una apuesta
export const placeRuleta = async (id, ruletData) => {
    const ruleta = await Ruleta.findById(id);
    if (!ruleta) {
        throw new Error("No se encontro la ruleta");
    }
    if (ruleta.status  !== "open") {
        throw new Error("La ruleta no esta abierta");
    }
   const { type, number, color, amount } = ruletData;
   
   if (!amount || amount <=0 || amount > 10000) {
    throw new Error("Maximo es 10000, La cantidad no es valida");
   }

   if (type == "number") {
    if (number === undefined || number < 0 || number > 36) {
        throw new Error("Invalido el numero,tiene que estar entre 0 y 36");
    }
   } else if (type === "color") {
    if (!["rojo", "negro"].includes((color))) {
        throw new Error("El color no es el requerido, es 'rojo' o 'negro'");
    }
   } else {
    throw new Error("La Clase de apuesta no es valida");
   }
   ruleta.roulet.push({ type, number, color, amount });
   await ruleta.save();
   return ruleta;
};
  //cerrar ruleta,generar numero ganador y calcular el pago
export const closeRuleta = async (id) => {
    const ruleta = await Ruleta.findById(id);
    if (!ruleta) {
        throw new Error("No se encontro la ruleta");
    }
    if (ruleta.status !== "open") {
        throw new Error("Ya esta cerrada la ruleta");
    }

    // Numero ganador automatico
 const numeroGanador = Math.floor(Math.random() * 37); //0-36
 const colorGanador = numeroGanador % 2 === 0  ? "rojo" : "negro";


 ruleta.numeroGanador = numeroGanador;
 ruleta.colorGanador = colorGanador;
  ruleta.status = "closed";

 await ruleta.save();

 //Calcular ganancia de cada apuesta
 const resultadoRuleta = ruleta.roulet.map((apuesta) =>{
    let payout = 0;
    if (apuesta.type === "number" && apuesta.number === numeroGanador) {
        payout = apuesta.amount * 5;       
    }
    if (apuesta.type === "color" && apuesta.color === colorGanador) {
        payout = apuesta.amount * 1.8;
    }
    
    return {
        type: apuesta.type,
        number: apuesta.number,
        color: apuesta.color,
        amount: apuesta.amount,
        payout,
    
 };
 });

   return {
    ruletaId: ruleta._id,
    numeroGanador,
    colorGanador,
    ruleta: resultadoRuleta,
   };
};
  export const listRuletas = async () => {
    const ruletas = await Ruleta.find({}, { roulet: 0 });
    return ruletas;
 };

 



