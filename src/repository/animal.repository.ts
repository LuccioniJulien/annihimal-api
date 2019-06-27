import { Animal } from "../models/animal";
import { Base } from "./base.repository";

export default class AnimalRepo extends Base<Animal> {
  constructor() {
    super(Animal);
  }

  public getDetailsOfAnimal(id: number) {
    return this.entities
      .createQueryBuilder()
      .leftJoinAndSelect("Animal.habitats", "habitats")
      .leftJoinAndSelect("Animal.threats", "threats")
      .leftJoinAndSelect("Animal.preys", "preys")
      .leftJoinAndSelect("Animal.predators", "predators")
      .leftJoinAndSelect("Animal.class", "class")
      .leftJoinAndSelect("Animal.diet", "diet")
      .leftJoinAndSelect("Animal.lifestyle", "lifestyle")
      .leftJoinAndSelect("Animal.group_Behavior", "group_Behavior")
      .where(`"Animal"."id" = :id`, { id })
      .getOne();
  }
}
