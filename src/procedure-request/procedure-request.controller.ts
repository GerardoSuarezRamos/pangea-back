import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProcedureRequestService } from './procedure-request.service';
import { CreateProcedureRequestDto } from './dto/create-procedure-request.dto';
import { UpdateProcedureRequestDto } from './dto/update-procedure-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('procedure-request')
export class ProcedureRequestController {
  constructor(
    private readonly procedureRequestService: ProcedureRequestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProcedureRequestDto: CreateProcedureRequestDto) {
    return this.procedureRequestService.create(createProcedureRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.procedureRequestService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedureRequestService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcedureRequestDto: UpdateProcedureRequestDto,
  ) {
    return this.procedureRequestService.update(+id, updateProcedureRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedureRequestService.remove(id);
  }
}
