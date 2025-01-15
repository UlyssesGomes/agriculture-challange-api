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

    async getAllFarms(): Promise<Farm[]> {
        return await this.farmRepository.find();
    }

    private preCreate(data) {
        if(data.totalArea < (data.vegetationArea + data.arableArea))
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
        const existingFarm = await this.getFarmById(id);

        if (!existingFarm) {
            throw new NotFoundException(`Farm with ID ${id} not found`);
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
