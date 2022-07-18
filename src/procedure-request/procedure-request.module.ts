import { Module } from '@nestjs/common';
import { ProcedureRequestService } from './procedure-request.service';
import { ProcedureRequestController } from './procedure-request.controller';

@Module({
  controllers: [ProcedureRequestController],
  providers: [ProcedureRequestService]
})
export class ProcedureRequestModule {}
