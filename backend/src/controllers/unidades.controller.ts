import { Request, Response } from "express";
import { z } from "zod";
import { UnitsService } from "../services/unidades.service";
import { STATUS_CODE } from "../utils/http-code";

export class UnitController {
  static async create(req: Request, res: Response) {
    try {
      await UnitsService.createUnit(req.body);
      res.status(STATUS_CODE.CREATED).send("Create successful.");
    } catch (error) {
      console.error("Error creating unit:", error);

      if (!(error instanceof z.ZodError)) {
        return res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }

      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ error: "Validation error", details: error.errors });
    }
  }
  static async softDelete(req: Request, res: Response) {
    try {
      const unitId = parseInt(req.params.id, 10);
      await UnitsService.deleteUnitSoft(unitId);
      res.status(STATUS_CODE.NO_CONTENT).send();
    } catch (error) {
      console.error("Error deleting unit:", error);

      if (!(error instanceof z.ZodError)) {
        return res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }

      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ error: "Validation error", details: error.errors });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const unitId = parseInt(req.params.id, 10);
      const updatedUnit = await UnitsService.updateUnit(unitId, req.body);
      res.status(STATUS_CODE.OK).json(updatedUnit);
    } catch (error) {
      console.error("Error updating unit:", error);

      if (!(error instanceof z.ZodError)) {
        return res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }

      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ error: "Validation error", details: error.errors });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const allUnits = await UnitsService.getAllUnits();
      res.status(STATUS_CODE.OK).json(allUnits);
    } catch (error) {
      console.error("Error getting all units:", error);
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: "Error getting all units" });
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const unitId = parseInt(req.params.id, 10);
      const unit = await UnitsService.getUnitById(unitId);
      res.status(STATUS_CODE.OK).json(unit);
    } catch (error) {
      console.error("Error getting unit by ID:", error);

      if (typeof error === "string" && error === "Unit not found") {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Unit not found" });
      }

      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: "Error getting unit by ID" });
    }
  }
}
