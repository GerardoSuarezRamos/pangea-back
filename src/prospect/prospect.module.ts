import { Module } from '@nestjs/common';
import { ProspectService } from './prospect.service';
import { ProspectController } from './prospect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Prospect } from './entities/prospect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prospect])],
  controllers: [ProspectController],
  providers: [ProspectService],
  exports: [ProspectService],
})
export class ProspectModule {}
