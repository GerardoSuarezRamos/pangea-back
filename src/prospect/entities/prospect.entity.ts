import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';

export type StatusUser = 'active' | 'inactive' | 'waiting';
export type TypeDocuments = 'CC' | 'CE' | 'PEP';

@Entity()
export class Prospect {
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

  @Column({ type: 'varchar', length: '100', unique: true })
  phone: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'] })
  status: StatusUser;

  @Column({ type: 'text' })
  observation: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
