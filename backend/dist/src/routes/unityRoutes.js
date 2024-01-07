"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unidades_controller_1 = require("../controllers/unidades.controller");
const router = express_1.default.Router();
router.post("/unidades", unidades_controller_1.UnitController.create);
router.delete("/unidades/:id", unidades_controller_1.UnitController.softDelete);
router.put('/unidades/:id', unidades_controller_1.UnitController.update);
router.get('/unidades', unidades_controller_1.UnitController.getAll);
router.get('/unidades/:id', unidades_controller_1.UnitController.getById);
exports.default = router;
