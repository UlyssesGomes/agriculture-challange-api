import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { ProducerService } from './../producer.service';
import { ProducerType } from '../producer.enum';
import { Repository } from 'typeorm';
import { Producer } from './../producer.entity';

describe('ProducerService', () => {
    let service: ProducerService;
    let repository: Repository<Producer>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProducerService,
                {
                    provide: getRepositoryToken(Producer),
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

        service = module.get<ProducerService>(ProducerService);
        repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {

        const producerData = { id: 1, name: 'John Doe', cpf: '58243282009', type: ProducerType.PF };

        beforeEach(() => {
            jest.spyOn(repository, 'insert').mockResolvedValue(producerData as any);
        });

        it('should call create method on service', async () => {
            expect(await service.create(producerData)).toEqual(producerData);
        });

        it('should throw BadRequestException if CPF is not valid', async () => {
            const producerData = { name: 'John Doe', cpf: '58243282001', type: ProducerType.PF };
            await expect(service.create(producerData)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if CNPJ is not valid', async () => {
            const producerData = { name: 'John Doe', cnpj: '86982015000115', type: ProducerType.PJ };
            await expect(service.create(producerData)).rejects.toThrow(BadRequestException);
        });
    });

    describe('findAll', () => {
        it('should call find method on service', async () => {
            const producers: any[] = [
                { id: 1, name: 'John Doe', cpf: '58243282009', type: ProducerType.PF },
                { id: 2, name: 'Jane Doe', cnpj: '91250581001', type: ProducerType.PJ },
                { id: 3, name: 'Bob Smith', cpf: '36499800023', type: ProducerType.PF }
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(producers);
            expect(await service.findAll()).toEqual(producers);
            expect(repository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        const id = 1;
        const producer = { id, name: 'John Doe' };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(producer as any);
        });

        it('should call findOne method on service and return the producer.', async () => {
            expect(await service.findOne(id)).toEqual(producer);
        });

        it('should throw NotFoundException if producer is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        const id = 1;
        const existingProducer = { id: id, name: 'John Doe' };
        const producerData = { name: 'Jane Doe' };

        beforeEach(() => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(existingProducer as any);
        });

        it('should call update method on service if existing producer is found and return it.', async () => {
            jest.spyOn(repository, 'save').mockResolvedValue(existingProducer as any)
            const result = await service.update(id, producerData);
            expect(result).toBe(existingProducer);
        });

        it('should return null if existing producer is not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(await service.update(id, producerData)).toBeNull();
        });
    });

    describe('delete', () => {
        it('should call delete method on repository', async () => {
            const id = 1;
            const affected: any = { affected: 0 };
            jest.spyOn(repository, 'delete').mockResolvedValue(affected);
            await service.delete(id);
            expect(repository.delete).toHaveBeenCalledTimes(1);
            expect(repository.delete).toHaveBeenCalledWith(id);
        });

        it('should return 0 if producer not found', async () => {
            const id = 1;
            const result: any = { affected: 0 };
            jest.spyOn(repository, 'delete').mockResolvedValue(result);
            expect(await service.delete(id)).toBe(0);
        });
    });
});
