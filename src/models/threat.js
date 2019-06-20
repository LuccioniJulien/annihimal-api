import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from "typeorm";
import Animal from "./animal";

@Entity()
export class Threat {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @ManyToMany(type => Animal, animal => animal.threats)
  @JoinTable()
  animals = undefined;
}
