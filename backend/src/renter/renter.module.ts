import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RenterController } from './renter.controller';
import { RenterService } from './renter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RenterController],
  providers: [RenterService],
})
export class RenterModule {}
