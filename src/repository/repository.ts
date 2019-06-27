import AnimalRepo from "./animal.repository";
import { Service } from "@tsed/common";
@Service()
export default class Repository {
  private animalRepository: AnimalRepo;

  get animals(): AnimalRepo {
    if (this.animalRepository == null) {
      this.animalRepository = new AnimalRepo();
    }
    return this.animalRepository;
  }
}
