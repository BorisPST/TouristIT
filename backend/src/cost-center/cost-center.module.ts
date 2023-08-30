import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CostCenterController } from './cost-center.controller';
import { CostCenterService } from './cost-center.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CostCenterController],
  providers: [CostCenterService],
})
export class CostCenterModule {}
