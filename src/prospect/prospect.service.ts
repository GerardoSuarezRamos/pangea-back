import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, getConnection } from 'typeorm';

import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Prospect } from './entities/prospect.entity';

@Injectable()
export class ProspectService {
  constructor(
    @InjectRepository(Prospect)
    private usersRepository: Repository<Prospect>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('prospect');

  async create(createProspectDto: CreateProspectDto) {
    const prospect: Prospect = new Prospect();

    prospect.first_name = createProspectDto.first_name;
    prospect.last_name = createProspectDto.last_name;
    prospect.email = createProspectDto.email;
    prospect.status = createProspectDto.status;
    prospect.document_id = createProspectDto.document_id;
    prospect.type_document = createProspectDto.type_document;

    try {
      await this.query.save<Prospect>(prospect);
    } catch (e) {
      return e.message;
    }

    return prospect;
  }

  findAll(): Promise<Prospect[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Prospect> {
    try {
      return await this.usersRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async findOneByEmailAndPassword(email: string): Promise<Prospect> {
    try {
      const user = await this.usersRepository.findOneBy({ email: email });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
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
    prospect.document_id = updateTaskDto.document_id;
    prospect.type_document = updateTaskDto.type_document;
    prospect.deleteAt = updateTaskDto.deleteAt;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Prospect)
        .set({ ...prospect })
        .where('id = :id', { id: id })
        .execute();
    } catch (e) {
      return e.message;
    }

    return prospect;
  }
}
