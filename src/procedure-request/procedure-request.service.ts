import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProcedureRequestDto } from './dto/create-procedure-request.dto';
import { UpdateProcedureRequestDto } from './dto/update-procedure-request.dto';
import { ProcedureRequest } from './entities/procedure-request.entity';

@Injectable()
export class ProcedureRequestService {
  constructor(
    @InjectRepository(ProcedureRequest)
    private procedureRequestRepository: Repository<ProcedureRequest>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('procedureRequest');
  procedureRepository = this.connection.getRepository('procedure');

  async create(createProcedureRequestDto: CreateProcedureRequestDto) {
    try {
      const procedureRequest: ProcedureRequest = new ProcedureRequest();
      const procedure = await this.procedureRepository.findOneByOrFail({
        id: createProcedureRequestDto.procedureId,
      });

      if (!procedure)
        return {
          success: false,
          message: 'El Procedimiento no se ha encontrado',
        };

      // personal data
      procedureRequest.name = createProcedureRequestDto.name;
      procedureRequest.gender = createProcedureRequestDto.gender;
      procedureRequest.date_birthday = createProcedureRequestDto.date_birthday;
      procedureRequest.phone = createProcedureRequestDto.phone;
      procedureRequest.email = createProcedureRequestDto.email;
      procedureRequest.country = createProcedureRequestDto.country;
      procedureRequest.city = createProcedureRequestDto.city;
      procedureRequest.zip_code = createProcedureRequestDto.zip_code;
      procedureRequest.status = createProcedureRequestDto.status;

      // medical data
      procedureRequest.alcohol = createProcedureRequestDto.alcohol;
      procedureRequest.smoke = createProcedureRequestDto.smoke;
      procedureRequest.weight = createProcedureRequestDto.weight;
      procedureRequest.height = createProcedureRequestDto.height;
      procedureRequest.blood_type = createProcedureRequestDto.blood_type;
      procedureRequest.drugs = createProcedureRequestDto.drugs;
      procedureRequest.imc = createProcedureRequestDto.imc;

      // procedure relations interest
      procedureRequest.procedures = procedure as any;

      await this.query.save<ProcedureRequest>(procedureRequest);
      return procedureRequest;
    } catch (e) {
      return e.message;
    }
  }

  findAll(): Promise<ProcedureRequest[]> {
    return this.procedureRequestRepository.find();
  }

  async findOne(id: number): Promise<ProcedureRequest> {
    try {
      return await this.procedureRequestRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async update(id: number, updateProcedureDto: UpdateProcedureDto) {
    const procedure: ProcedureRequest = new ProcedureRequest();

    try {
      this.procedureRequestRepository.update(id, procedure);
    } catch (e) {
      return e.message;
    }
    return procedure;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.query.delete(id);
    } catch (err) {
      console.log(err.message);
    }
  }
}
