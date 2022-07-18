import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureRequestController } from './procedure-request.controller';
import { ProcedureRequestService } from './procedure-request.service';

describe('ProcedureRequestController', () => {
  let controller: ProcedureRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedureRequestController],
      providers: [ProcedureRequestService],
    }).compile();

    controller = module.get<ProcedureRequestController>(ProcedureRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
