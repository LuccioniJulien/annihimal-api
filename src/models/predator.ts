import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Predator" })
export class Predator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToMany(type => Animal, animal => animal.predators)
  @JoinTable({ name: "Animal_has_predators" })
  animals: Animal[];
}
