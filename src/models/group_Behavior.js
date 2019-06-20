import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import Animal from "./animal"

@Entity()
export class Group_Behavior {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @OneToMany(type => Group_Behavior, animal => animal.group_Behavior) // note: we will create author property in the Photo class below
  animals = undefined;
}