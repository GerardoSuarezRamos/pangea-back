import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureRequestService } from './procedure-request.service';

describe('ProcedureRequestService', () => {
  let service: ProcedureRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcedureRequestService],
    }).compile();

    service = module.get<ProcedureRequestService>(ProcedureRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
