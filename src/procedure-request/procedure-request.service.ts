import { Injectable } from '@nestjs/common';
import { CreateProcedureRequestDto } from './dto/create-procedure-request.dto';
import { UpdateProcedureRequestDto } from './dto/update-procedure-request.dto';

@Injectable()
export class ProcedureRequestService {
  create(createProcedureRequestDto: CreateProcedureRequestDto) {
    return 'This action adds a new procedureRequest';
  }

  findAll() {
    return `This action returns all procedureRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procedureRequest`;
  }

  update(id: number, updateProcedureRequestDto: UpdateProcedureRequestDto) {
    return `This action updates a #${id} procedureRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} procedureRequest`;
  }
}
