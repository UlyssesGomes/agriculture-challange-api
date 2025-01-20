import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';

import { FarmService } from './../farm.service';
import { Farm } from './../farm.entity';

describe('FarmService', () => {
    let service: FarmService;
    let repository: Repository<Farm>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FarmService,
                {
                    provide: getRepositoryToken(Farm),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn(),
                        save: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        merge: jest.fn(),
                        updateDateColumn: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<FarmService>(FarmService);
        repository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllFarms', () => {
        it('should call find all method on service', async () => {
            const farms = [
                { id: 1, name: 'Golden Harvest', city: 'João Pessoa', state: 'PB', totalArea: 1000, vegetationArea: 500, arableArea: 300 },
                { id: 2, name: 'Green Valley', city: 'Campina Grande', state: 'PB', totalArea: 2000, vegetationArea: 800, arableArea: 400 },
                { id: 3, name: 'Sunset Farm', city: 'Santa Luzia', state: 'PB', totalArea: 3000, vegetationArea: 1000, arableArea: 500 },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(farms as any);
            expect(await service.getAllFarms()).toEqual(farms);
            expect(repository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('create', () => {
        const farmData = { id: 1, name: 'Golden Harvest', city: 'São Paulo', state: 'SP', totalArea: 1000, vegetationArea: 500, arableArea: 300 };

        beforeEach(() => {
            jest.spyOn(repository, 'insert').mockResolvedValue(farmData as any);
        });

        it('should call createFarm method on service', async () => {
            expect(await service.createFarm(farmData)).toEqual(farmData);
        });

        it('should throw BadRequestException if totalArea is less than vegetationArea plus arableArea', async () => {
            const farmData = { name: 'Golden Harvest', city: 'Rio de Janeiro', state: 'RJ', totalArea: 10, vegetationArea: 20, arableArea: 30 };
            await expect(service.createFarm(farmData)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getFarmById', () => {
        const id = 1;
        const farm = { id: id, name: 'Golden Harvest', city: 'São Paulo', state: 'SP', totalArea: 1000, vegetationArea: 500, arableArea: 300 };
        
        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(farm as any);
        });

        it('should call findOne method on repository', async () => {
            expect(await service.getFarmById(id)).toEqual(farm);
        });

        it('should throw NotFoundException if farm is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.getFarmById(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        const id = 1;
        const existingFarm = { id: id, name: 'Sunflower Farm', city: 'Florianópolis', state: 'SC', totalArea: 2000, vegetationArea: 800, arableArea: 400 };
        const farmData = { name: 'Golden Harvest', city: 'Curitiba', state: 'PR', totalArea: 1000, vegetationArea: 500, arableArea: 300 };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(existingFarm as any);
        });

        it('should call updateFarm method on service if existing farm is found and return it', async () => {
            jest.spyOn(repository, 'save').mockResolvedValue(existingFarm as any)
            const result = await service.updateFarm(id, farmData);
            expect(result).toBe(existingFarm);
        });

        it('should return null if existing farm is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.updateFarm(id, farmData)).toBeNull();
        });
    });

    describe('delete', () => {
        const id = 1;

        it('should call delete method on service', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            const result = await service.delete(id);
            expect(result).toBe(1);
        });

        it('should return 0 if farm is not found', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);
            const result = await service.delete(id);
            expect(result).toBe(0);
        });
    });

    describe('getFarmsByProducer', () => {
        const producerId = 1;
        const farms = [{ id: 1, name: 'Golden Harvest', city: 'São Paulo', state: 'SP', totalArea: 1000, vegetationArea: 500, arableArea: 300 }];

        beforeEach(() => {
            jest.spyOn(repository, 'find').mockResolvedValue(farms as any);
        });

        it('should call find method on service and return farms founded.', async () => {
            expect(await service.getFarmsByProducer(producerId)).toEqual(farms);
            expect(repository.find).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException if no farm found associated to Producer', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue(null);
            await expect(service.getFarmsByProducer(producerId)).rejects.toThrow(NotFoundException);
        });
    });
});