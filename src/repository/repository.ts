import AnimalRepo from "./animal.repository";
import { Service } from "@tsed/common";
import IRepository from "../interfaces/IRepository";
import IAnimalRepo from "../interfaces/IAnimalRepo";

@Service()
export default class Repository implements IRepository {
  private animalRepository: IAnimalRepo;

  get animals(): IAnimalRepo {
    if (this.animalRepository == null) {
      this.animalRepository = new AnimalRepo();
    }
    return this.animalRepository;
  }
}
