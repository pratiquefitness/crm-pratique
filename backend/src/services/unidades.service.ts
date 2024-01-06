import { ZodType, z } from "zod";
import prisma from "../config/prisma";
import { v4 as uuidv4 } from "uuid";

const UnitSchema = z.object({
  nome_unidade: z.string().max(255),
  numero_unidade: z.number().int(),
  endereco_unidade: z.string().max(255),
  unidade_separador: z.number().int(),
});

type UnitDataProps = ZodType<typeof UnitSchema>;

export class UnitsService {
  static async createUnit(data: UnitDataProps) {
    try {
      const dataUnit = UnitSchema.parse(data);
      const newUnit = await prisma.unidades.create({
        data: {
          created_at: new Date(),
          key_unidade: uuidv4(),
          ...dataUnit,
        },
      });
      return newUnit;
    } catch (error) {
      console.error("Error creating unit in the service:", error);
      throw new Error("Error creating unit");
    }
  }
  static async deleteUnitSoft(id: number) {
    try {
      const deletedUnit = await prisma.unidades.update({
        where: { id_unidade: id },
        data: { deleted_at: new Date() },
      });

      if (!deletedUnit) {
        throw new Error("Unit not found");
      }

      return deletedUnit;
    } catch (error) {
      console.error("Error deleting unit in the service:", error);
      throw new Error("Error deleting unit");
    }
  }
  static async updateUnit(id: number, data: UnitDataProps) {
    try {
      const existingUnit = await prisma.unidades.findUnique({
        where: { id_unidade: id },
      });

      if (!existingUnit) {
        throw new Error("Unit not found");
      }

      const updatedUnit = await prisma.unidades.update({
        where: { id_unidade: id },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });

      return updatedUnit;
    } catch (error) {
      console.error("Error updating unit in the service:", error);
      throw new Error("Error updating unit");
    }
  }
  static async getAllUnits() {
    try {
      const allUnits = await prisma.unidades.findMany({
        where: { deleted_at: null },
      });
      return allUnits;
    } catch (error) {
      console.error("Error getting all units in the service:", error);
      throw new Error("Error getting all units");
    }
  }
  static async getUnitById(id: number) {
    try {
      const unit = await prisma.unidades.findUnique({
        where: {
          id_unidade: id,
        },
      });

      if (!unit) {
        throw new Error('Unit not found');
      }

      return unit;
    } catch (error) {
      console.error('Error getting unit by ID:', error);
      throw new Error('Error getting unit by ID');
    }
  }
}
