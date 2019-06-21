import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Habitat" })
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToMany(type => Animal, animal => animal.habitats)
  @JoinTable({ name: "Animal_has_habitats" })
  animals: Animal[];
}
