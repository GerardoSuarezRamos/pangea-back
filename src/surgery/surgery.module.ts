import { ProceduresModule } from './../procedures/procedures.module';
import { Module } from '@nestjs/common';
import { SurgeryService } from './surgery.service';
import { SurgeryController } from './surgery.controller';

import { Surgery } from './entities/surgery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectModule } from '../prospect/prospect.module';

@Module({
  imports: [
    ProspectModule,
    ProceduresModule,
    TypeOrmModule.forFeature([Surgery]),
  ],
  controllers: [SurgeryController],
  providers: [SurgeryService],
})
export class SurgeryModule {}
