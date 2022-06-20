import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  query = this.connection.getRepository('user');

  async create(createUserDto: CreateUserDto) {
    const user: User = new User();

    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.status = createUserDto.status;
    user.document_id = createUserDto.document_id;
    user.type_document = createUserDto.type_document;
    user.role = createUserDto.role;

    try {
      await this.query.save<User>(user);
    } catch (e) {
      return e.message;
    }

    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({ id: id });
    } catch (err) {
      console.log(err.messaage);
    }
  }

  async findOneByEmailAndPassword(email: string): Promise<User> {
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
      const user: UpdateUserDto = await this.findOne(+id);

      await this.update(+id, { ...user, deleteAt: new Date() });
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateUserDto) {
    const user: User = new User();

    user.first_name = updateTaskDto.first_name;
    user.last_name = updateTaskDto.last_name;
    user.email = updateTaskDto.email;
    user.password = await bcrypt.hash(updateTaskDto.password, 10);
    user.status = updateTaskDto.status;
    user.document_id = updateTaskDto.document_id;
    user.type_document = updateTaskDto.type_document;
    user.role = updateTaskDto.role;
    user.deleteAt = updateTaskDto.deleteAt;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ ...user })
        .where('id = :id', { id: id })
        .execute();
    } catch (e) {
      return e.message;
    }

    return user;
  }
}
