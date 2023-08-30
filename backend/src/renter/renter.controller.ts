import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RenterService } from './renter.service';
import { Renter } from '@prisma/client';

@Controller('renter')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  @Get()
  async getAllRenters(): Promise<Renter[]> {
    return this.renterService.getAll();
  }

  @Post()
  async createRenter(
    @Body()
    data: {
      address: string;
      city: string;
      name: string;
      propertyId: number;
      property: { connect: { id: number } };
      oib: string;
      iban: string;
    },
  ): Promise<Renter> {
    return this.renterService.create(data);
  }

  @Patch('/:id')
  async updateRenter(
    @Param('id') id: string,
    @Body()
    data: {
      address: string;
      city: string;
      name: string;
      propertyId: number;
      property: { connect: { id: number } };
      oib: string;
      iban: string;
    },
  ): Promise<Renter> {
    return this.renterService.update(Number(id), data);
  }

  @Delete('/:id')
  async deleteRenter(@Param('id') id: string): Promise<Renter> {
    return this.renterService.delete(Number(id));
  }

  @Get('/:id')
  async getRenterById(@Param('id') id: string): Promise<Renter> {
    return this.renterService.getById(Number(id));
  }
}
