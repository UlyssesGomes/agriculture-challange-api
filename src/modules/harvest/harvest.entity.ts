import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Farm } from 'src/modules/farm/farm.entity';
import { PlantedCrop } from 'src/modules/planted-crop/planted-crop.entity';

@Entity()
export class Harvest extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  year: number;

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  farm: Farm;

  @OneToMany(() => PlantedCrop, (plantedCrop) => plantedCrop.harvest)
  plantedCrops: PlantedCrop[];
}
