import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Harvest } from '../harvest/harvest.entity';

@Entity()
export class PlantedCrop extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 300 })
  crop: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.plantedCrops)
  harvest: Harvest;
}
