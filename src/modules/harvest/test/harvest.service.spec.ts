import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { HarvestService } from './../harvest.service';
import { Repository } from 'typeorm';
import { Harvest } from './../harvest.entity';

describe('HarvestService', () => {
    let service: HarvestService;
    let repository: Repository<Harvest>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HarvestService,
                {
                    provide: getRepositoryToken(Harvest),
                    useValue: {
                        find: jest.fn(),
                        insert: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<HarvestService>(HarvestService);
        repository = module.get<Repository<Harvest>>(getRepositoryToken(Harvest));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllHarvests', () => {
        it('should call find method on service and return the harvests.', async () => {
            const harvests: any[] = [
                { id: 1, year: 2022 },
                { id: 2, year: 2023 },
                { id: 3, year: 2024 },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(harvests);
            expect(await service.getAllHarvests()).toEqual(harvests);
        });
    });

    describe('create', () => {
        const harvestData = { id: 1, year: 2022 };

        beforeEach(() => {
            jest.spyOn(repository, 'insert').mockResolvedValue(harvestData as any);
        });

        it('should call create method on service and return the harvest.', async () => {
            expect(await service.create(harvestData)).toEqual(harvestData);
        });
    });

    describe('getHarvestById', () => {
        const id = 1;
        const harvest = { id, year: 2022 };

        it('should call findOne method on service and return the harvest.', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(harvest as any);
            expect(await service.getHarvestById(id)).toEqual(harvest);
        });

        it('should return null if harvest is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.getHarvestById(id)).toBeNull();
        });
    });

    describe('update', () => {
        const id = 1;
        const existingHarvest = { id: id, year: 2022 };
        const harvestData = { year: 2023 };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(existingHarvest as any);
        });

        it('should call update method on service if existing harvest is found and return it.', async () => {
            jest.spyOn(repository, 'save').mockResolvedValue(existingHarvest as any)
            const result = await service.update(id, harvestData);
            expect(result).toBe(existingHarvest);
        });

        it('should return null if there is no existing harvest', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.update(id, harvestData)).toBeNull();
        });
    });

    describe('delete', () => {
        it('should call delete method on repository', async () => {
            const id = 1;
            const affected: any = { affected: 1 };
            jest.spyOn(repository, 'delete').mockResolvedValue(affected);
            const result = await service.delete(id);
            expect(result).toBe(1);
        });

        it('should return 0 if harvest not found', async () => {
            const id = 1;
            const result: any = { affected: 0 };
            jest.spyOn(repository, 'delete').mockResolvedValue(result);
            expect(await service.delete(id)).toBe(0);
        });
    });
});