import { Procedure } from 'src/procedures/entities/procedure.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export type GenderUser = 'Male' | 'Female';

@Entity()
export class ProcedureRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: GenderUser;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  zip_code: string;

  @Column({ type: 'date', length: 255 })
  date_birthday: Date;

  @Column({ type: 'varchar', length: 255 })
  imc: string;

  @Column({ type: 'varchar', length: 255 })
  smoke: string;

  @Column({ type: 'varchar', length: 255 })
  drugs: string;

  @Column({ type: 'varchar', length: 255 })
  alcohol: string;

  @Column({ type: 'varchar', length: 100 })
  weight: string;

  @Column({ type: 'varchar', length: 100 })
  height: string;

  @Column({ type: 'varchar', length: 100 })
  blood_type: string;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @ManyToOne(() => Procedure, (procedure) => procedure.id)
  @JoinColumn()
  procedures: Procedure[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
