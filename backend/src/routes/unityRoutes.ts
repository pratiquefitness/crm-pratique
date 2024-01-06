import express from "express";
import { UnitController } from "../controllers/unidades.controller";

const router = express.Router();

router.post("/unidades", UnitController.create);
router.delete("/unidades/:id", UnitController.softDelete);
router.put('/unidades/:id', UnitController.update);  
router.get('/unidades', UnitController.getAll);
router.get('/unidades/:id', UnitController.getById);

export default router;
