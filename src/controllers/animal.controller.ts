import {
  Controller,
  Get,
  Status,
  Scope,
  ProviderScope,
  PathParams,
  QueryParams
} from "@tsed/common";
import { Animal } from "../models/animal";
import Repository from "../services/repository.service";
import { Description, Returns } from "@tsed/swagger";
import ErrorRequest from "../errors/ErrorRequest";
import BaseController from "./base.controller";

@Scope(ProviderScope.INSTANCE)
@Controller("/animals")
export class AnimalsController extends BaseController<Animal> {
  constructor(serviceRepo: Repository) {
    super(serviceRepo, Animal);
  }

  @Get("/details/:id")
  @Status(200)
  @Returns(400, { description: "Bad Request" })
  @Returns(200, { description: "Found" })
  @Description("Get one animal by id with his details")
  async getDetails(@PathParams("id") id: number): Promise<object> {
    const animal = await this._repo.animals.getDetailsOfAnimal(id);
    if (!animal) throw new ErrorRequest("Not found", 404);
    return { animal };
  }

  @Get("/random")
  @Status(200)
  @Returns(400, { description: "Bad Request" })
  @Returns(200, { description: "Found" })
  @Description("Get random animals")
  async getRandom(@QueryParams("skip") number: number = 0): Promise<object> {
    const animals: Array<Animal> = await this._repo.animals.getRandomAnimals(
      number
    );
    if (!animals) throw new ErrorRequest("Not found", 404);
    return { animals };
  }
}
