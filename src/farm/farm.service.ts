import { Injectable, NotFoundException } from '@nestjs/common';
import { Farm } from './farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FarmService {
    constructor(
        @InjectRepository(Farm)
        private readonly farmRepository: Repository<Farm>,
    ) { }

    async getAllFarms(): Promise<Farm[]> {
        return await this.farmRepository.find();
    }

    async createFarm(farmData: Partial<Farm>): Promise<Farm> {
        const newFarm = this.farmRepository.create(farmData);
        return await this.farmRepository.save(newFarm);
    }

    async getFarmById(id: number): Promise<Farm | undefined> {
        const farm = await this.farmRepository.findOne({ where: { id } });
        if (!farm) {
            throw new NotFoundException(`Farm with ID ${id} not found`);
        }
        return farm;
    }

    async updateFarm(id: number, farmData: Partial<Farm>): Promise<Farm | undefined> {
        const existingFarm = await this.getFarmById(id);

        if (!existingFarm) {
            throw new Error(`Farm with ID ${id} not found`);
        }

        Object.assign(existingFarm, farmData);
        return await this.farmRepository.save(existingFarm);
    }

    async deleteFarm(id: number): Promise<void> {
        const existingFarm = await this.getFarmById(id);

        if (existingFarm) {
            await this.farmRepository.delete(id);
        }
    }

    async getFarmsByProducer(producerId: number): Promise<Farm[]> {
        return await this.farmRepository
            .find({
                where: { producer: { id: producerId } },
            })
            .then((farms) => farms);
    }
}


// now create to me 3 different curl request to create 3 farms considering  and producerId = 2.