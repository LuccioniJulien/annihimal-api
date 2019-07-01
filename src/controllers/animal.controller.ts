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

@Scope(ProviderScope.INSTANCE)
@Controller("/animals")
export class AnimalsController {
  private _repo: Repository;

  constructor(serviceRepo: Repository) {
    this._repo = serviceRepo;
  }

  @Get()
  @Status(200)
  @Description("Get list of animals")
  @Returns(404, { description: "Not found" })
  @Returns(200, { description: "Found" })
  async getAll(
    @QueryParams() skip: number = 0,
    @QueryParams() limit: number = 15
  ): Promise<object> {
    const animals: Array<Animal> = await this._repo.animals.getAll(skip, limit);
    return { animals };
  }

  @Get("/:id")
  @Status(200)
  @Returns(404, { description: "Not found" })
  @Returns(400, { description: "Bad Request" })
  @Returns(200, { description: "Found" })
  @Description("Get one animal by id")
  async get(@PathParams("id") id: number): Promise<object> {
    const animal: Animal = await this._repo.animals.get(id);
    if (!animal) throw new ErrorRequest("Not found", 404);
    return { animal };
  }

  @Get("/details/:id")
  @Status(200)
  @Returns(400, { description: "Bad Request" })
  @Returns(200, { description: "Found" })
  @Description("Get one animal by id whith his details")
  async getDetails(@PathParams("id") id: number): Promise<object> {
    const animal = await this._repo.animals.getDetailsOfAnimal(id);
    if (!animal) throw new ErrorRequest("Not found", 404);
    return { animal };
  }
}
