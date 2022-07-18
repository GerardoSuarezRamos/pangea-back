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

type GenderUser = 'Male' | 'Female';

@Entity()
export class ProcedureRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: GenderUser;

  @Column({ type: 'varchar', length: 255 })
  weight: string;

  @Column({ type: 'varchar', length: 255 })
  height: string;

  @Column({ type: 'varchar', length: 255 })
  blood_type: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @ManyToOne(() => Procedure, (procedure) => procedure.id)
  @JoinColumn()
  procedure: Procedure;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
