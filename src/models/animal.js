import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";
}
