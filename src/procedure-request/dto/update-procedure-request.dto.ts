import { PartialType } from '@nestjs/mapped-types';
import { CreateProcedureRequestDto } from './create-procedure-request.dto';

export class UpdateProcedureRequestDto extends PartialType(
  CreateProcedureRequestDto,
) {
  deleteAt?: Date;
}
