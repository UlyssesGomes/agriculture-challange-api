import { Injectable } from '@nestjs/common';

import { Producer } from './producer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProducerService {
    constructor(
        @InjectRepository(Producer)
        private producerRepository: Repository<Producer>,
    ) { }

    findAll() {
        return this.producerRepository.find();
    }

    create(data: any) {
        return this.producerRepository.save(data);
    }
}
