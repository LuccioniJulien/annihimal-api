import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from "typeorm";
import Animal from "./animal"

@Entity()
export class Lifestyle {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @OneToMany(type => Animal, animal => animal.lifestyle) // note: we will create author property in the Photo class below
  animals = undefined;
}