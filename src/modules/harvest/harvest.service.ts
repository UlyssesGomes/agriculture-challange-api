import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Harvest } from './harvest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestRepository: Repository<Harvest>,
  ) {}

  async getAllHarvests(): Promise<Harvest[]> {
    return await this.harvestRepository.find();
  }

  async create(harvestData: Partial<Harvest>) {
    await this.harvestRepository.insert(harvestData);
    return harvestData;
  }

  async getHarvestById(id: number): Promise<Harvest | undefined> {
    return await this.harvestRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    harvestData: Partial<Harvest>,
  ): Promise<Harvest | undefined> {
    const existingHarvest = await this.getHarvestById(id);

    if (!existingHarvest) {
      throw new NotFoundException(`Harvest with ID ${id} not found`);
    }

    Object.assign(existingHarvest, harvestData);
    return await this.harvestRepository.save(existingHarvest);
  }

  async delete(id: number) {
    const result = await this.harvestRepository.delete(id);
    return result.affected;
  }
}
