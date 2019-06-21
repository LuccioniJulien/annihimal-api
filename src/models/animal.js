import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  BaseEntity
} from "typeorm";
import Habitat from "./habitat";
import Threat from "./threat";
import Prey from "./prey";
import Class from "./class";
import Diet from "./diet";
import Lifestyle from "./lifestyle";
import Group_Behavior from "./group_Behavior";
import User from "./user";
import "reflect-metadata";
@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @Column("varchar")
  scientific_name = "";

  @Column("varchar")
  color = "";

  @Column("varchar")
  skin_type = "";

  @Column("varchar")
  status = "";

  @Column("varchar")
  img = "";

  @Column("varchar")
  size = "";

  @Column("varchar")
  weight = "";

  @Column("varchar")
  gestation = "";

  @Column("varchar")
  litter_size = "";

  @Column("varchar")
  lifespan = "";

  @Column("varchar")
  fun_fact = "";

  @ManyToMany(type => Habitat, habitat => habitat.animals)
  @JoinTable()
  habitats = undefined;

  @ManyToMany(type => Threat, threat => threat.animals)
  @JoinTable()
  threats = undefined;

  @ManyToMany(type => Prey, prey => prey.animals)
  @JoinTable()
  preys = undefined;

  @ManyToMany(type => Prey, predator => predator.animals)
  @JoinTable()
  predators = undefined;

  @ManyToMany(type => User, user => user.animals)
  @JoinTable()
  users = undefined;

  @ManyToOne(type => Class, oneClass => oneClass.animals)
  class = undefined;

  @ManyToOne(type => Diet, diet => diet.animals)
  diet = undefined;

  @ManyToOne(type => Lifestyle, lifestyle => lifestyle.animals)
  lifestyle = undefined;

  @ManyToOne(type => Group_Behavior, gb => gb.animals)
  group_Behavior = undefined;
}
