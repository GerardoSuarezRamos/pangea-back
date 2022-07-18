import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcedureRequestService } from './procedure-request.service';
import { CreateProcedureRequestDto } from './dto/create-procedure-request.dto';
import { UpdateProcedureRequestDto } from './dto/update-procedure-request.dto';

@Controller('procedure-request')
export class ProcedureRequestController {
  constructor(private readonly procedureRequestService: ProcedureRequestService) {}

  @Post()
  create(@Body() createProcedureRequestDto: CreateProcedureRequestDto) {
    return this.procedureRequestService.create(createProcedureRequestDto);
  }

  @Get()
  findAll() {
    return this.procedureRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedureRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcedureRequestDto: UpdateProcedureRequestDto) {
    return this.procedureRequestService.update(+id, updateProcedureRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedureRequestService.remove(+id);
  }
}
