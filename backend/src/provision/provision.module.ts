import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProvisionController } from './provision.controller';
import { ProvisionService } from './provision.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvisionController],
  providers: [ProvisionService],
})
export class ProvisionModule {}
