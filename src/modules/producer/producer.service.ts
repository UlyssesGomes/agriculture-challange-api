import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Producer } from './producer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerType } from './producer.enum';
import { UtilsValidation } from '../../shared/utils/utils-validation';

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
    if (data.type === ProducerType.PF) {
      if (!UtilsValidation.validateCpfDigits(data.cpf))
        throw new BadRequestException(
          `Producer must have a valid CPF with only digits.`,
        );
    } else if (data.type === ProducerType.PJ) {
      if (!UtilsValidation.validateCnpjDigits(data.cnpj))
        throw new BadRequestException(
          `Producer must have a valid CNPJ with only digits.`,
        );
    } else {
      throw new BadRequestException(`Producer must have a type PF or PJ.`);
    }
  }

  async create(data: any) {
    this.preCreate(data);
    await this.producerRepository.insert(data);
    return data;
  }

  async update(id: number, data: any) {
    const producer = await this.producerRepository.findOne({ where: { id } });

    if (!producer) {
      return null;
    }

    Object.assign(producer, data);
    return await this.producerRepository.save(producer);
  }

  async findOne(id: number) {
    const producer = await this.producerRepository.findOne({ where: { id } });
    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    return producer;
  }

  async findOneWithDetails(id: number) {
    const producer = await this.producerRepository.findOne({
      where: { id },
      relations: ['farms', 'farms.harvests', 'farms.harvests.plantedCrops'],
    });
    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    return producer;
  }

  async delete(id: number) {
    const result = await this.producerRepository.delete(id);
    return result.affected;
  }
}
