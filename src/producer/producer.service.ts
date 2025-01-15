import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Producer } from './producer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerType } from './producer.enum';
import { UtilsValidation } from 'src/utils/utils-validation';

@Injectable()
export class ProducerService {
    constructor(
        @InjectRepository(Producer)
        private producerRepository: Repository<Producer>,
    ) { }

    findAll() {
        return this.producerRepository.find();
    }

    private preCreate(data) {
        if(data.type === ProducerType.PF) {
            if(!UtilsValidation.validateCpfDigits(data.cpf))
                throw new BadRequestException(`Producer must have a valid CPF with only digits.`);
        } else if (data.type === ProducerType.PJ) {
            if(!UtilsValidation.validateCnpjDigits(data.cnpj))
                throw new BadRequestException(`Producer must have a valid CNPJ with only digits.`);
        } else {
            throw new BadRequestException(`Producer must have a type PF or PJ.`);
        }
    }

    private preUpdate(data) {
        this.preCreate(data);
    }

    create(data: any) {
        this.preCreate(data);
        return this.producerRepository.save(data);
    }

    update(id: string, data: any) {
        this.preUpdate(data);
        return this.producerRepository.update(id, data);
    }

    async findOne(id: number) {
        const producer = await this.producerRepository.findOne({ where: { id } });
        if (!producer) {
            throw new NotFoundException(`Producer with ID ${id} not found`);
        }
        return producer;
    }

    delete(id: number) {
        return this.producerRepository.delete(id);
    }
}
