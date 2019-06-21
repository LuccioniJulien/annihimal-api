import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Animal } from "./animal";

@Entity({ name: "Group_Behavior" })
export class Group_Behavior {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @OneToMany(type => Animal, animal => animal.group_Behavior) // note: we will create author property in the Photo class below
  animals: Animal[];
}
