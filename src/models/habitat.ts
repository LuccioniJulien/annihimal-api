import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Animal } from "./animal";
import { Property } from "@tsed/common";

@Entity({ name: "Habitat" })
export class Habitat {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column("varchar")
  @Property()
  name: string;

  @ManyToMany(type => Animal, animal => animal.habitats)
  @JoinTable({ name: "Animal_has_habitats" })
  animals: Animal[];
}
