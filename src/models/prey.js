import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";

@Entity()
export class Prey {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @ManyToMany(type => Animal, animal => animal.preys)
  @JoinTable()
  animals = undefined;
}
