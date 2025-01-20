import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PlantedCrop } from './planted-crop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlantedCropService {
  constructor(
    @InjectRepository(PlantedCrop)
    private readonly plantedCropRepository: Repository<PlantedCrop>,
  ) {}

  async getAllPlantedCrops(): Promise<PlantedCrop[]> {
    return await this.plantedCropRepository.find();
  }

  async create(plantedCropData: Partial<PlantedCrop>) {
    await this.plantedCropRepository.insert(plantedCropData);
    return plantedCropData;
  }

  async getPlantedCropById(id: number): Promise<PlantedCrop | undefined> {
    const plantedCrop = await this.plantedCropRepository.findOne({ where: { id } });
    if (!plantedCrop) {
      throw new NotFoundException(`Planted Crop with ID ${id} not found`);
    }
    return plantedCrop;
  }

  async update(
    id: number,
    plantedCropData: Partial<PlantedCrop>,
  ): Promise<PlantedCrop | undefined> {
    const existingPlantedCrop = await this.plantedCropRepository.findOne({ where: { id } });

    if (!existingPlantedCrop) {
      return null;
    }

    Object.assign(existingPlantedCrop, plantedCropData);
    return await this.plantedCropRepository.save(existingPlantedCrop);
  }

  async delete(id: number) {
    const result = await this.plantedCropRepository.delete(id);
    return result.affected;
  }
}
