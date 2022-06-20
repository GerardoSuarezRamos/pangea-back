import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';

export type StatusUser = 'active' | 'inactive';
export type TypeDocuments = 'CC' | 'CE' | 'PEP';
export type UserRoles = 'administrative' | 'superAdmin' | 'doctor' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'enum', enum: ['CC', 'CE', 'PEP'] })
  type_document: TypeDocuments;

  @Column({ type: 'int', unique: true })
  document_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: '100' })
  password: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'] })
  status: StatusUser;

  @Column({
    type: 'enum',
    enum: ['administrative', 'superAdmin', 'doctor', 'user'],
  })
  role: UserRoles;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
