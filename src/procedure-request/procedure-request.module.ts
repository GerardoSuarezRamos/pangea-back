import { ProcedureRequest } from './entities/procedure-request.entity';
import { Module } from '@nestjs/common';
import { ProcedureRequestService } from './procedure-request.service';
import { ProcedureRequestController } from './procedure-request.controller';
import { ProceduresModule } from 'src/procedures/procedures.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProceduresModule, TypeOrmModule.forFeature([ProcedureRequest])],
  controllers: [ProcedureRequestController],
  providers: [ProcedureRequestService],
})
export class ProcedureRequestModule {}
