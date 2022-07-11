import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, getConnection } from 'typeorm';

import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Prospect } from './entities/prospect.entity';

@Injectable()
export class ProspectService {
  constructor(
    @InjectRepository(Prospect)
    private prospectRepository: Repository<Prospect>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('prospect');

  async create(createProspectDto: CreateProspectDto) {
    const prospect: Prospect = new Prospect();

    prospect.first_name = createProspectDto.first_name;
    prospect.last_name = createProspectDto.last_name;
    prospect.email = createProspectDto.email;
    prospect.status = createProspectDto.status;
    prospect.phone = createProspectDto.phone;
    prospect.document_id = createProspectDto.document_id;
    prospect.observation = createProspectDto.observation;
    prospect.type_document = createProspectDto.type_document;

    try {
      await this.query.save<Prospect>(prospect);
    } catch (e) {
      return e.message;
    }

    return prospect;
  }

  findAll(): Promise<Prospect[]> {
    return this.prospectRepository.find();
  }

  async findOne(id: number): Promise<Prospect> {
    try {
      return await this.prospectRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user: UpdateProspectDto = await this.findOne(+id);

      await this.update(+id, { ...user, deleteAt: new Date() });
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateProspectDto) {
    const prospect: Prospect = new Prospect();

    prospect.first_name = updateTaskDto.first_name;
    prospect.last_name = updateTaskDto.last_name;
    prospect.email = updateTaskDto.email;
    prospect.status = updateTaskDto.status;
    prospect.phone = updateTaskDto.phone;
    prospect.document_id = updateTaskDto.document_id;
    prospect.type_document = updateTaskDto.type_document;
    prospect.observation = updateTaskDto.observation;
    prospect.deleteAt = updateTaskDto.deleteAt;

    try {
      await this.prospectRepository.update(id, prospect);
    } catch (e) {
      return e.message;
    }

    return prospect;
  }
}
