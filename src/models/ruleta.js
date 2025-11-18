import mongoose from "mongoose";


const rouletSchema = new mongoose.Schema({

 type: {
    type: String,
    enum: ["number", "color"],
    required: true,
 },
 number: {
    type: Number,
    min: 0,
    max: 36,
    
 },
 color: {
    type: String,
    enum:["roja", "negro"],
 },
 amount: {
    type: Number,
    required: true,
    max: 100000,
 },
},
 { _id: false }
);

const ruletaSchema = new mongoose.Schema(
  {
    status: {
       type: String,
       enum: String,
       enum: ["open", "closed"] ,
       default: "closed"
    },
    roulet: [rouletSchema],

    numeroGanador: {
        type: Number,
        min: 0,
        max: 36,
    },
    colorGanador: {
        type: String,
        enum: ["rojo", "negro"],
    },
},
   {
    timestamps: true,
   }

);

export const Ruleta = mongoose.model("Ruleta", ruletaSchema);