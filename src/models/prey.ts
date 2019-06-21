import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Prey" })
export class Prey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToMany(type => Animal, animal => animal.preys)
  @JoinTable({ name: "Animal_has_preys" })
  animals: Animal[];
}
