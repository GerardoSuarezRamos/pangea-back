import { typeSurgery } from '../entities/procedure.entity';

export class CreateProcedureDto {
  name: string;
  description: string;
  value: string;
  difficulty: number;
  type: typeSurgery;
}
