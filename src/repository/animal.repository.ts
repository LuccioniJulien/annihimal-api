import { Animal } from "../models/animal";
import { Base } from "./base.repository";
import { getRandom } from "../utils/random";

export default class AnimalRepo extends Base<Animal> {
  constructor() {
    super(Animal);
  }

  public async getRandomAnimals(nbRequested: number) {
    const totalAnimal: number = await this.entities
      .createQueryBuilder()
      .getCount();

    const animals: Array<Animal> = [];

    for (let index = 0; index < nbRequested; index++) {
      const randomInt: number = getRandom({ min: 1, max: totalAnimal });
      console.log(randomInt);
      const randomAnimal: Animal = await this.entities.findOne(randomInt);

      animals.push(randomAnimal);
    }

    return animals;
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
