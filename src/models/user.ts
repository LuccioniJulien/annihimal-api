import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  Unique
} from "typeorm";
import { Animal } from "./animal";
import { Property, Required } from "@tsed/common";
import { IsEmail, Equals } from "class-validator";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Required()
  @Property()
  @Column({ type: "varchar", unique: true })
  username: string;

  @Required()
  @Property()
  @Column({ type: "varchar", unique: true })
  @IsEmail()
  email: string;

  @Required()
  @Property()
  @Column("varchar")
  password: string;

  @Property()
  password_confirmation: string;

  @ManyToMany(type => Animal, animal => animal.users)
  @JoinTable({ name: "User_has_animals_favorites" })
  animals: Animal[];
}
