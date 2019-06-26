import { Controller, Get, Status, Scope, ProviderScope } from "@tsed/common";
import { Animal } from "../models/animal";
import IRepository from "../interfaces/IRepository";
import Repository from "../repository/repository";

@Scope(ProviderScope.INSTANCE)
@Controller("/animals")
export class AnimalsController {
  private repo: IRepository;

  constructor(serviceRepo: Repository) {
    this.repo = serviceRepo;
  }

  @Get()
  @Status(200)
  async getAll(): Promise<Array<Animal>> {
    const animals: Array<Animal> = await this.repo.animals.get();
    return animals;
  }

  // @Get()
  // @Status(200)
  // async getHabitats(): Promise<Array<Habitat>> {
  //   const habitats: Array<Habitat> = await getAnimals();
  //   return animals;
  // }
}
