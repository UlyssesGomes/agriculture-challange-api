import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Farm } from '../farm/farm.entity';
import { ProducerType } from './producer.enum';

@Entity()
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, unique: true })
  cnpj: string;

  @Column({ nullable: true, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2 })
  type: ProducerType;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
