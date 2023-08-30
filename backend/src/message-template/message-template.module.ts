import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MessageTemplateController } from './message-template.controller';
import { MessageTemplateService } from './message-template.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageTemplateController],
  providers: [MessageTemplateService],
})
export class MessageTemplateModule {}
