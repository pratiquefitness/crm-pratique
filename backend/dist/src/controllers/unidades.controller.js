"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitController = void 0;
const zod_1 = require("zod");
const unidades_service_1 = require("../services/unidades.service");
const http_code_1 = require("../utils/http-code");
class UnitController {
    static async create(req, res) {
        try {
            await unidades_service_1.UnitsService.createUnit(req.body);
            res.status(http_code_1.STATUS_CODE.CREATED).send("Create successful.");
        }
        catch (error) {
            console.error("Error creating unit:", error);
            if (!(error instanceof zod_1.z.ZodError)) {
                return res
                    .status(http_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal server error" });
            }
            return res
                .status(http_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ error: "Validation error", details: error.errors });
        }
    }
    static async softDelete(req, res) {
        try {
            const unitId = parseInt(req.params.id, 10);
            await unidades_service_1.UnitsService.deleteUnitSoft(unitId);
            res.status(http_code_1.STATUS_CODE.NO_CONTENT).send();
        }
        catch (error) {
            console.error("Error deleting unit:", error);
            if (!(error instanceof zod_1.z.ZodError)) {
                return res
                    .status(http_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal server error" });
            }
            return res
                .status(http_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ error: "Validation error", details: error.errors });
        }
    }
    static async update(req, res) {
        try {
            const unitId = parseInt(req.params.id, 10);
            const updatedUnit = await unidades_service_1.UnitsService.updateUnit(unitId, req.body);
            res.status(http_code_1.STATUS_CODE.OK).json(updatedUnit);
        }
        catch (error) {
            console.error("Error updating unit:", error);
            if (!(error instanceof zod_1.z.ZodError)) {
                return res
                    .status(http_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal server error" });
            }
            return res
                .status(http_code_1.STATUS_CODE.BAD_REQUEST)
                .json({ error: "Validation error", details: error.errors });
        }
    }
    static async getAll(req, res) {
        try {
            const allUnits = await unidades_service_1.UnitsService.getAllUnits();
            res.status(http_code_1.STATUS_CODE.OK).json(allUnits);
        }
        catch (error) {
            console.error("Error getting all units:", error);
            res
                .status(http_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
                .json({ error: "Error getting all units" });
        }
    }
    static async getById(req, res) {
        try {
            const unitId = parseInt(req.params.id, 10);
            const unit = await unidades_service_1.UnitsService.getUnitById(unitId);
            res.status(http_code_1.STATUS_CODE.OK).json(unit);
        }
        catch (error) {
            console.error("Error getting unit by ID:", error);
            if (typeof error === "string" && error === "Unit not found") {
                return res
                    .status(http_code_1.STATUS_CODE.NOT_FOUND)
                    .json({ error: "Unit not found" });
            }
            return res
                .status(http_code_1.STATUS_CODE.INTERNAL_SERVER_ERROR)
                .json({ error: "Error getting unit by ID" });
        }
    }
}
exports.UnitController = UnitController;
