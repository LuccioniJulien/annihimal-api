import Repository from "../services/repository.service";
import {
  Get,
  Status,
  QueryParams,
  PathParams,
  Required,
  Post,
  BodyParams
} from "@tsed/common";
import { Description, Returns } from "@tsed/swagger";
import { getString } from "../utils/genericUtils";
import ErrorRequest from "../errors/ErrorRequest";

export default abstract class BaseController<T> {
  public _repo: Repository;
  private _name: string;
  constructor(serviceRepo: Repository, modelClass: { new (): T }) {
    this._repo = serviceRepo;
    this._name = getString(modelClass);
  }

  @Get("/")
  @Status(200)
  @Description("Get a list")
  @Returns(200, { description: "OK" })
  async getAll(
    @QueryParams("skip") skip: number = 0,
    @QueryParams("limit") limit: number = 15
  ): Promise<object> {
    console.log(this._name);
    const list: Array<T> = await this._repo[this._name + "s"].getAll(
      skip,
      limit
    );
    return { [this._name + "s"]: list };
  }

  @Get("/:id")
  @Status(200)
  @Returns(404, { description: "Not found" })
  @Returns(400, { description: "Bad Request" })
  @Returns(200, { description: "Found" })
  @Description(`Get one row by id `)
  async get(@PathParams("id") id: number): Promise<object> {
    const entity: T = await this._repo[this._name + "s"].get(id);
    if (!entity) throw new ErrorRequest("Not found", 404);
    return { [this._name]: entity };
  }

  @Post("/")
  @Status(201)
  @Description("Subscribe a user")
  @Returns(400, { description: "Bad Request" })
  public async subscribe(@Required() @BodyParams() entity: T): Promise<object> {
    this._repo[this._name + "s"].insert(entity);
    return { [this._name]: entity };
  }
}
