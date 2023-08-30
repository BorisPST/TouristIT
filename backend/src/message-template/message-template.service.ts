import { Injectable } from '@nestjs/common';
import { MessageTemplate, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MessageTemplateService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(
    data: Prisma.MessageTemplateCreateInput,
  ): Promise<MessageTemplate> {
    return this.dbService.messageTemplate.create({
      data,
    });
  }

  async update(
    id: number,
    messageTemplate: Prisma.MessageTemplateCreateInput,
  ): Promise<MessageTemplate> {
    return this.dbService.messageTemplate.update({
      where: { id: Number(id) },
      data: messageTemplate,
    });
  }

  async delete(id: number): Promise<MessageTemplate> {
    return this.dbService.messageTemplate.delete({
      where: { id: Number(id) },
    });
  }

  async getAll(): Promise<MessageTemplate[]> {
    return this.dbService.messageTemplate.findMany();
  }

  async getById(id: number): Promise<MessageTemplate> {
    return this.dbService.messageTemplate.findUnique({
      where: { id: Number(id) },
    });
  }
}
