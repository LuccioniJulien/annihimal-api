import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Lifestyle" })
export class Lifestyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @OneToMany(type => Animal, animal => animal.lifestyle) // note: we will create author property in the Photo class below
  animals: Animal[];
}
