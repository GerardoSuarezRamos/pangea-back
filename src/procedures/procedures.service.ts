import { Repository, Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

import { Procedure } from './entities/procedure.entity';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('procedure');

  async create(createProcedureDto: CreateProcedureDto) {
    const procedure: Procedure = new Procedure();

    procedure.name = createProcedureDto.name;
    procedure.description = createProcedureDto.description;
    procedure.value = createProcedureDto.value;
    procedure.difficulty = createProcedureDto.difficulty;
    procedure.type = createProcedureDto.type;

    try {
      await this.query.save<Procedure>(procedure);
    } catch (e) {
      return e.message;
    }
    return procedure;
  }

  findAll(): Promise<Procedure[]> {
    return this.procedureRepository.find();
  }

  async findOne(id: number): Promise<Procedure> {
    try {
      return await this.procedureRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async update(id: number, updateProcedureDto: UpdateProcedureDto) {
    const procedure: Procedure = new Procedure();

    procedure.name = updateProcedureDto.name;
    procedure.description = updateProcedureDto.description;
    procedure.value = updateProcedureDto.value;
    procedure.difficulty = updateProcedureDto.difficulty;
    procedure.type = updateProcedureDto.type;

    try {
      this.procedureRepository.update(id, procedure);
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
