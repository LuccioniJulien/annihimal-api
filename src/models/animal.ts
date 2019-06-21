import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne
} from "typeorm";

import { Habitat } from "./habitat";
import { Threat } from "./threat";
import { Prey } from "./prey";
import { Class } from "./class";
import { Diet } from "./diet";
import { Lifestyle } from "./lifestyle";
import { Group_Behavior } from "./group_Behavior";
import { User } from "./user";
import { Predator } from "./predator";

@Entity({ name: "Animal" })
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  scientific_name: string;

  @Column("varchar", { nullable: true })
  color: string;

  @Column("varchar", { nullable: true })
  skin_type: string;

  @Column("varchar", { nullable: true })
  status: string;

  @Column("varchar", { nullable: true })
  img: string;

  @Column("varchar", { nullable: true })
  size: string;

  @Column("varchar", { nullable: true })
  weight: string;

  @Column("varchar", { nullable: true })
  gestation: string;

  @Column("varchar", { nullable: true })
  litter_size: string;

  @Column("varchar", { nullable: true })
  lifespan: string;

  @Column("varchar", { nullable: true })
  fun_fact: string;

  @ManyToMany(type => Habitat, habitat => habitat.animals)
  @JoinTable({ name: "Animal_has_habitats" })
  habitats: Habitat[];

  @ManyToMany(type => Threat, threat => threat.animals)
  @JoinTable({ name: "Animal_has_threaths" })
  threats: Threat[];

  @ManyToMany(type => Prey, prey => prey.animals)
  @JoinTable({ name: "Animal_has_preys" })
  preys: Prey[];

  @ManyToMany(type => Predator, prey => prey.animals)
  @JoinTable({ name: "Animal_has_predators" })
  predators: Predator[];

  @ManyToMany(type => User, user => user.animals)
  @JoinTable({ name: "User_has_animals_favorites" })
  users: User[];

  @ManyToOne(type => Class, oneClass => oneClass.animals)
  class: Class;

  @ManyToOne(type => Diet, diet => diet.animals)
  diet: Diet;

  @ManyToOne(type => Lifestyle, lifestyle => lifestyle.animals)
  lifestyle: Lifestyle;

  @ManyToOne(type => Group_Behavior, gb => gb.animals)
  group_Behavior: Group_Behavior;
}
