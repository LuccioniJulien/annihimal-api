import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from "typeorm";
import Animal from "./animal"

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @OneToMany(type => Animal, animal => animal.class) // note: we will create author property in the Photo class below
  animals = undefined;
}