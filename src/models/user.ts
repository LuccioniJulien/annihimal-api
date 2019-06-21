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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  username: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @ManyToMany(type => Animal, animal => animal.users)
  @JoinTable({ name: "User_has_animals_favorites" })
  animals: Animal[];
}
