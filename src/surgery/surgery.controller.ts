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
import { SurgeryService } from './surgery.service';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import { UpdateSurgeryDto } from './dto/update-surgery.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('surgery')
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSurgeryDto: CreateSurgeryDto) {
    return this.surgeryService.create(createSurgeryDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.surgeryService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surgeryService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProspectDto: UpdateSurgeryDto) {
    return this.surgeryService.update(+id, updateProspectDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surgeryService.remove(id);
  }
}
