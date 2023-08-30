import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Utility } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Get()
  async getAllUtilities(): Promise<Utility[]> {
    return this.utilityService.getAll();
  }

  @Post()
  async createUtility(
    @Body() data: { name: string; unitPrice: Decimal },
  ): Promise<Utility> {
    return this.utilityService.create(data);
  }

  @Patch('/:id')
  async updateUtility(
    @Param('id') id: string,
    @Body() data: { name: string; unitPrice: Decimal },
  ): Promise<Utility> {
    return this.utilityService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteUtility(@Param('id') id: string): Promise<Utility> {
    return this.utilityService.delete(Number(id));
  }

  @Get('/:id')
  async getUtilityById(@Param('id') id: string): Promise<Utility> {
    return this.utilityService.getById(Number(id));
  }
}
