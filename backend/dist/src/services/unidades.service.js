"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsService = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../config/prisma"));
const uuid_1 = require("uuid");
const UnitSchema = zod_1.z.object({
    nome_unidade: zod_1.z.string().max(255),
    numero_unidade: zod_1.z.number().int(),
    endereco_unidade: zod_1.z.string().max(255),
    unidade_separador: zod_1.z.number().int(),
});
class UnitsService {
    static async createUnit(data) {
        try {
            const dataUnit = UnitSchema.parse(data);
            const newUnit = await prisma_1.default.unidades.create({
                data: {
                    created_at: new Date(),
                    key_unidade: (0, uuid_1.v4)(),
                    ...dataUnit,
                },
            });
            return newUnit;
        }
        catch (error) {
            console.error("Error creating unit in the service:", error);
            throw new Error("Error creating unit");
        }
    }
    static async deleteUnitSoft(id) {
        try {
            const deletedUnit = await prisma_1.default.unidades.update({
                where: { id_unidade: id },
                data: { deleted_at: new Date() },
            });
            if (!deletedUnit) {
                throw new Error("Unit not found");
            }
            return deletedUnit;
        }
        catch (error) {
            console.error("Error deleting unit in the service:", error);
            throw new Error("Error deleting unit");
        }
    }
    static async updateUnit(id, data) {
        try {
            const existingUnit = await prisma_1.default.unidades.findUnique({
                where: { id_unidade: id },
            });
            if (!existingUnit) {
                throw new Error("Unit not found");
            }
            const updatedUnit = await prisma_1.default.unidades.update({
                where: { id_unidade: id },
                data: {
                    ...data,
                    updated_at: new Date(),
                },
            });
            return updatedUnit;
        }
        catch (error) {
            console.error("Error updating unit in the service:", error);
            throw new Error("Error updating unit");
        }
    }
    static async getAllUnits() {
        try {
            const allUnits = await prisma_1.default.unidades.findMany({
                where: { deleted_at: null },
            });
            return allUnits;
        }
        catch (error) {
            console.error("Error getting all units in the service:", error);
            throw new Error("Error getting all units");
        }
    }
    static async getUnitById(id) {
        try {
            const unit = await prisma_1.default.unidades.findUnique({
                where: {
                    id_unidade: id,
                },
            });
            if (!unit) {
                throw new Error('Unit not found');
            }
            return unit;
        }
        catch (error) {
            console.error('Error getting unit by ID:', error);
            throw new Error('Error getting unit by ID');
        }
    }
}
exports.UnitsService = UnitsService;
