import { Animal } from "../models/animal";
import { Base } from "./base.repository";
import IAnimalRepo from "../interfaces/IAnimalRepo";

export default class AnimalRepo extends Base<Animal> implements IAnimalRepo {
  constructor() {
    super(Animal);
  }
}
