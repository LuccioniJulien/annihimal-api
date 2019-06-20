import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import Animal from "./animal";

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @ManyToMany(type => Animal, animal => animal.habitats)
  @JoinTable()
  animals = undefined;
}
