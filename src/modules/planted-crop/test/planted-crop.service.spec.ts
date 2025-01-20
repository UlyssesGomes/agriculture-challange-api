import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { PlantedCropService } from './../planted-crop.service';
import { Repository } from 'typeorm';
import { PlantedCrop } from './../planted-crop.entity';

describe('PlantedCropService', () => {
    let service: PlantedCropService;
    let repository: Repository<PlantedCrop>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlantedCropService,
                {
                    provide: getRepositoryToken(PlantedCrop),
                    useValue: {
                        insert: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PlantedCropService>(PlantedCropService);
        repository = module.get<Repository<PlantedCrop>>(getRepositoryToken(PlantedCrop));
    });

    describe('getAllPlantedCrops', () => {
        it('should call find method on repository and return the planted crops.', async () => {
            const plantedCrops: any[] = [
                { id: 1, crop: 'Wheat' },
                { id: 2, crop: 'Corn' },
                { id: 3, crop: 'Soybeans' },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(plantedCrops);
            expect(await service.getAllPlantedCrops()).toEqual(plantedCrops);
        });
    });

    describe('create', () => {
        const plantedCropData = { id: 1, crop: 'Wheat' };

        beforeEach(() => {
            jest.spyOn(repository, 'insert').mockResolvedValue(plantedCropData as any);
        });

        it('should call create method on service and return the planted crop.', async () => {
            expect(await service.create(plantedCropData)).toEqual(plantedCropData);
        });
    });

    describe('getPlantedCropById', () => {
        const id = 1;
        const plantedCrop = { id, crop: 'Wheat' };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(plantedCrop as any);
        });

        it('should call findOne method on repository and return the planted crop.', async () => {
            expect(await service.getPlantedCropById(id)).toEqual(plantedCrop);
        });

        it('should throw NotFoundException if planted crop is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.getPlantedCropById(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        const id = 1;
        const existingPlantedCrop = { id: id, crop: 'Wheat' };
        const plantedCropData = { crop: 'Corn' };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(existingPlantedCrop as any);
        });

        it('should call update method on service if existing planted crop is found and return it.', async () => {
            jest.spyOn(repository, 'save').mockResolvedValue(existingPlantedCrop as any)
            const result = await service.update(id, plantedCropData);
            expect(result).toBe(existingPlantedCrop);
        });

        it('should return null if existing planted crop is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.update(id, plantedCropData)).toBeNull();
        });
    });

    describe('delete', () => {
        const id = 1;
        const affected: any = { affected: 0 };

        beforeEach(() => {
            jest.spyOn(repository, 'delete').mockResolvedValue(affected);
        });

        it('should call delete method on repository and return the number of affected rows.', async () => {
            expect(await service.delete(id)).toBe(0);
        });
    });
});