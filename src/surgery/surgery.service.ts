import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import { UpdateSurgeryDto } from './dto/update-surgery.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { Surgery } from './entities/surgery.entity';

@Injectable()
export class SurgeryService {
  constructor(
    @InjectRepository(Surgery)
    private surgerytRepository: Repository<Surgery>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('surgery');
  queryProcedure = this.connection.getRepository('prospect');
  queryProspect = this.connection.getRepository('procedure');

  async create(createSurgeryDto: CreateSurgeryDto) {
    try {
      const surgery: Surgery = new Surgery();

      const procedure = await this.queryProcedure.findOneByOrFail({
        id: createSurgeryDto.procedureId,
      });

      if (!procedure)
        return { success: false, message: 'El prospecto no se ha encontrado' };

      const prospect = await this.queryProcedure.findOneByOrFail({
        id: createSurgeryDto.prospectId,
      });

      if (!prospect)
        return { success: false, message: 'El prospecto no se ha encontrado' };

      surgery.procedure = procedure as any;
      surgery.prospect = prospect as any;
      surgery.status = createSurgeryDto.status;

      try {
        await this.query.save<Surgery>(surgery);
      } catch (e) {
        throw new Error(e.message);
      }

      return surgery;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Surgery[]> {
    try {
      return await this.surgerytRepository.find();
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async findOne(id: number): Promise<Surgery> {
    try {
      return await this.surgerytRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user: UpdateSurgeryDto = await this.findOne(+id);

      await this.update(+id, { ...user, deleteAt: new Date() });
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateSurgeryDto) {
    const surgery: Surgery = new Surgery();

    const procedure = await this.queryProcedure.findOneByOrFail({
      id: updateTaskDto.procedureId,
    });
    if (!procedure)
      return new NotFoundException('No se ha encontrado el el procedimiento');

    const prospect = await this.queryProcedure.findOneByOrFail({
      id: updateTaskDto.prospectId,
    });
    if (!prospect)
      return new NotFoundException('No se ha encontrado el el prospecto');

    surgery.procedure = procedure as any;
    surgery.prospect = prospect as any;
    surgery.status = updateTaskDto.status;
    surgery.deleteAt = updateTaskDto.deleteAt;

    try {
      await this.surgerytRepository.update(id, surgery);
    } catch (e) {
      return e.message;
    }

    return surgery;
  }
}
