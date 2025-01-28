import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { Harvest } from '../harvest/harvest.entity';
import { Producer } from '../producer/producer.entity';

@Entity()
export class Farm extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 400 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  city: string;

  @Column({ type: 'varchar', length: 200 })
  state: string;

  @Column()
  totalArea: number;

  @Column()
  vegetationArea: number;

  @Column()
  arableArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, { onDelete: 'CASCADE' })
  producer: Producer;

  @OneToMany(() => Harvest, (harvest) => harvest.farm, { cascade: true })
  harvests: Harvest[];
}
