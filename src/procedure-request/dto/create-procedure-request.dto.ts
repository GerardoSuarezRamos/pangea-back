import { GenderUser } from '../entities/procedure-request.entity';

export class CreateProcedureRequestDto {
  name: string;
  gender: GenderUser;
  phone: string;
  email: string;
  country: string;
  city: string;
  zip_code: string;
  date_birthday: Date;
  imc: string;
  smoke: string;
  drugs: string;
  alcohol: string;
  weight: string;
  height: string;
  blood_type: string;
  status: string;
  procedureId: number;
}
