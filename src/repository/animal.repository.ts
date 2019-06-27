import { Animal } from "../models/animal";
import { Base } from "./base.repository";

export default class AnimalRepo extends Base<Animal> {
  constructor() {
    super(Animal);
  }
}
