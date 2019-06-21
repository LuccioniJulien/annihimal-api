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

  @Column("varchar")
  scientific_name: string;

  @Column("varchar")
  color: string;

  @Column("varchar")
  skin_type: string;

  @Column("varchar")
  status: string;

  @Column("varchar")
  img: string;

  @Column("varchar")
  size: string;

  @Column("varchar")
  weight: string;

  @Column("varchar")
  gestation: string;

  @Column("varchar")
  litter_size: string;

  @Column("varchar")
  lifespan: string;

  @Column("varchar")
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
