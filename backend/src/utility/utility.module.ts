import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UtilityController } from './utility.controller';
import { UtilityService } from './utility.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UtilityController],
  providers: [UtilityService],
})
export class UtilityModule {}
