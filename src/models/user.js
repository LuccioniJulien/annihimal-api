import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from "typeorm";
import Animal from "./animal";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  username = "";

  @Column("varchar")
  email = "";

  @Column("varchar")
  password = "";

  @ManyToMany(type => Animal, animal => animal.users)
  @JoinTable()
  animals = undefined;
}
