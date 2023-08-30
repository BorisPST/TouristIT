import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Assistance } from '@prisma/client';
import { AssistanceService } from './assistance.service';

@Controller('assistance')
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @Get()
  async getAllAssistances(): Promise<Assistance[]> {
    return this.assistanceService.getAll();
  }

  @Post()
  async createAssistance(
    @Body() data: { provider: string; type: string },
  ): Promise<Assistance> {
    return this.assistanceService.create(data);
  }

  @Patch('/:id')
  async updateAssistance(
    @Param('id') id: string,
    @Body() data: { provider: string; type: string },
  ): Promise<Assistance> {
    return this.assistanceService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteAssistance(@Param('id') id: string): Promise<Assistance> {
    return this.assistanceService.delete(Number(id));
  }

  @Get('/:id')
  async getAssistanceById(@Param('id') id: string): Promise<Assistance> {
    return this.assistanceService.getById(Number(id));
  }
}
