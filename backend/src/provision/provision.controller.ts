import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Provision } from '@prisma/client';
import { ProvisionService } from './provision.service';

@Controller('provision')
export class ProvisionController {
  constructor(private readonly provisionService: ProvisionService) {}

  @Get()
  async getAllProvisions(): Promise<Provision[]> {
    return this.provisionService.getAll();
  }

  @Post()
  async createProvision(
    @Body() data: { id: number; title: string; description: string },
  ): Promise<Provision> {
    return this.provisionService.create(data);
  }

  @Patch('/:id')
  async updateProvision(
    @Param('id') id: string,
    @Body() data: { id: number; title: string; description: string },
  ): Promise<Provision> {
    return this.provisionService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteProvision(@Param('id') id: string): Promise<Provision> {
    return this.provisionService.delete(Number(id));
  }

  @Get('/:id')
  async getCostCenterById(@Param('id') id: string): Promise<Provision> {
    return this.provisionService.getById(Number(id));
  }
}
