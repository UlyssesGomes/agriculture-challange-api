import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
// import { Farm } from '../farm/farm.entity';

@Entity()
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn( 'increment' )
  id: number;

  @Column({ nullable: true, unique: true })
  cnpj: string;

  @Column({ nullable: true, unique: true })
  cpf: string;

  @Column()
  name: string;

//   @OneToMany(() => Farm, (farm) => farm.producer)
//   farms: Farm[];
}