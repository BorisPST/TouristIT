import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AssistanceController } from './assistance.controller';
import { AssistanceService } from './assistance.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssistanceController],
  providers: [AssistanceService],
})
export class AssistanceModule {}
