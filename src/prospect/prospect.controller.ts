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

import { ProspectService } from './prospect.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('prospect')
export class ProspectController {
  constructor(private readonly prospectService: ProspectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProspectDto: CreateProspectDto) {
    return this.prospectService.create(createProspectDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.prospectService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prospectService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProspectDto: UpdateProspectDto,
  ) {
    return this.prospectService.update(+id, updateProspectDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prospectService.remove(id);
  }
}
