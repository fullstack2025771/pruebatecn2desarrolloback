import {Router} from "express";
import { createRuletaController, openRuletaController, placeRuletaController, closeRuletaController, listRuletasController }  from "../controllers/ruleta.controller.js";

const router = Router();




router.post("/ruleta", createRuletaController);

router.patch("/ruleta/:id/open", openRuletaController);

router.post("/ruleta/:id/rulet", placeRuletaController);

router.patch("/ruleta/:id/cerrar", closeRuletaController);

router.get("/ruleta" , listRuletasController);


export default router;





