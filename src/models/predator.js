import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import Animal from "./animal";

@Entity()
export class Prey {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @ManyToMany(type => Animal, animal => animal.predators)
  @JoinTable()
  animals = undefined;
}
