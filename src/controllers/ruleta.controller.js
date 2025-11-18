
import {createRuleta, openRuleta, placeRuleta , closeRuleta, listRuletas} from "../services/ruletaservice.js";
export const createRuletaController = async (req, res) => {
    try {
       const ruleta = await createRuleta() ;
       res.status(201).json({ id: ruleta._id});
    } catch (error) {
       res.status(500) .json({ message: error.message})
    }
};
 export const openRuletaController = async (req, res) => {
    try {
        const { id } = req.params;
        const ruleta = await openRuleta(id);
        res.json({ message: "La ruleta se abrio correctamente", ruleta });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }  
};
 export const placeRuletaController = async (req, res) => {
    try {
        const {id } = req.params;
        const ruleta = await placeRuleta(id, req.body);
        res.json({ message: "Se registro la Apuesta", ruletaId: ruleta._id });
    } catch (error) {
       res.status(400).json({ message: error.message});
    }
 };

 export const closeRuletaController = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await closeRuleta(id);
        res.json({
            message: "Se cerro la ruleta", ...resultado

        });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
 };

 export const listRuletasController = async (req, res) => {
    try {
        const ruletas = await listRuletas();
        res.json(ruletas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };