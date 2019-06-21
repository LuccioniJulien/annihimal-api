import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Diet" })
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @OneToMany(type => Animal, animal => animal.diet)
  animals: Animal[];
}
