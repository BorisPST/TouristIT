import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CostCenter } from '@prisma/client';
import { CostCenterService } from './cost-center.service';

@Controller('cost-center')
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @Get()
  async getAllCostCenters(): Promise<CostCenter[]> {
    return this.costCenterService.getAll();
  }

  @Post()
  async createCostCenter(@Body() data: { name: string }): Promise<CostCenter> {
    return this.costCenterService.create(data);
  }

  @Patch('/:id')
  async updateCostCenter(
    @Param('id') id: string,
    @Body() data: { name: string },
  ): Promise<CostCenter> {
    return this.costCenterService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteCostCenter(@Param('id') id: string): Promise<CostCenter> {
    return this.costCenterService.delete(Number(id));
  }

  @Get('/:id')
  async getCostCenterById(@Param('id') id: string): Promise<CostCenter> {
    return this.costCenterService.getById(Number(id));
  }
}
