import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Threat" })
export class Threat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToMany(type => Animal, animal => animal.threats)
  @JoinTable({ name: "Animal_has_threaths" })
  animals: Animal[];
}
