import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Farm } from './farm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FarmService {
    constructor(
        @InjectRepository(Farm)
        private readonly farmRepository: Repository<Farm>,
    ) { }

    getAllFarms() {
        return this.farmRepository.find();
    }

    private preCreate(data) {
        if (data.totalArea < (data.vegetationArea + data.arableArea))
            throw new BadRequestException(`The total area must be greater than or equal to the sum of vegetation area plus arable area`);
    }

    async createFarm(farmData: any): Promise<Farm> {
        this.preCreate(farmData);
        await this.farmRepository.insert(farmData);
        return farmData;
    }

    async getFarmById(id: number): Promise<Farm | undefined> {
        const farm = await this.farmRepository.findOne({ where: { id } });
        if (!farm) {
            throw new NotFoundException(`Farm with ID ${id} not found`);
        }
        return farm;
    }

    async updateFarm(id: number, farmData: Partial<Farm>): Promise<Farm | undefined> {
        const existingFarm = await this.farmRepository.findOne({ where: { id } });

        if (!existingFarm) {
            return null;
        }

        Object.assign(existingFarm, farmData);
        return await this.farmRepository.save(existingFarm);
    }

    async delete(id: number) {
        const result = await this.farmRepository.delete(id);
        return result.affected;
    }

    async getFarmsByProducer(producerId: number): Promise<Farm[]> {
        const farms = await this.farmRepository
            .find({
                where: { producer: { id: producerId } },
            });

        if (!farms) {
            throw new NotFoundException(`No farm found associated to Producer with ID ${producerId}`);
        }

        return farms;
    }
}
