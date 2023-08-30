import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageTemplate } from '@prisma/client';
import { MessageTemplateService } from './message-template.service';

@Controller('message-template')
export class MessageTemplateController {
  constructor(
    private readonly messageTemplateService: MessageTemplateService,
  ) {}

  @Get()
  async getAllCostCenters(): Promise<MessageTemplate[]> {
    return this.messageTemplateService.getAll();
  }

  @Post()
  async createMessageTemplate(
    @Body() data: { name: string; body: string; type: string },
  ): Promise<MessageTemplate> {
    return this.messageTemplateService.create(data);
  }

  @Patch('/:id')
  async updateMessageTemplate(
    @Param('id') id: string,
    @Body() data: { name: string; body: string; type: string },
  ): Promise<MessageTemplate> {
    return this.messageTemplateService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteMessageTemplate(
    @Param('id') id: string,
  ): Promise<MessageTemplate> {
    return this.messageTemplateService.delete(Number(id));
  }

  @Get('/:id')
  async getMessageTemplateById(
    @Param('id') id: string,
  ): Promise<MessageTemplate> {
    return this.messageTemplateService.getById(Number(id));
  }
}
