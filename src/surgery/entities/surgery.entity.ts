import { Procedure } from './../../procedures/entities/procedure.entity';
import { Prospect } from 'src/prospect/entities/prospect.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Surgery {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Procedure, (procedure) => procedure.id)
  @JoinColumn()
  procedure: Procedure;

  @ManyToOne(() => Prospect, (prospect) => prospect.id)
  @JoinColumn()
  prospect: Prospect;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
