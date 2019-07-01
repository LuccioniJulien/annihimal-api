import {
  Controller,
  Status,
  Scope,
  ProviderScope,
  Post,
  BodyParams,
  PathParams,
  Required,
  Get,
  HeaderParams
} from "@tsed/common";
import Repository from "../services/repository.service";
import { Description, Returns } from "@tsed/swagger";
import ErrorRequest from "../errors/ErrorRequest";
import { User } from "../models/user";
import { validate } from "class-validator";
import { Animal } from "../models/animal";
import { hash, checkHash } from "../utils/bcrypt";
import { jwtSign, verifToken } from "../utils/jwt";

@Scope(ProviderScope.INSTANCE)
@Controller("/users")
export class UsersController {
  private _repo: Repository;

  constructor(serviceRepo: Repository) {
    this._repo = serviceRepo;
  }

  @Post("/subscribe")
  @Status(201)
  @Description("Subscribe a user")
  @Returns(400, { description: "Bad Request" })
  public async subscribe(
    @Required() @BodyParams("users", User) user: User
  ): Promise<void> {
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new ErrorRequest(errors.join(", "), 400);
    }
    if (user.password !== user.password_confirmation) {
      throw new ErrorRequest(
        "Password and password_confirmation should be the same",
        400
      );
    }

    user.password = await hash(user.password);
    this._repo.users.insert(user);
    return null;
  }

  @Post("/login")
  @Status(200)
  @Description("Login")
  @Returns(400, { description: "Bad Request" })
  public async authenticate(
    @Required() @BodyParams("email") email: string,
    @Required() @BodyParams("password") password: string
  ): Promise<object> {
    const user: User = await this._repo.users.getByEmail(email);
    if (!user) throw new ErrorRequest("Bad request", 400);
    console.log(password);
    console.log(user.password);
    if (!(await checkHash(password, user.password)))
      throw new ErrorRequest("unauthorized", 401);

    const { id, email: login } = user;
    const jwt = jwtSign({ id, email: login });

    return { user, jwt };
  }

  @Post("/favorite")
  @Status(201)
  @Description("Login")
  @Returns(400, { description: "Bad Request" })
  public async addFavorite(
    @Required() @BodyParams("userId") userId: number,
    @Required() @BodyParams("animalId") animalId: number,
    @Required() @HeaderParams("Authorization") bearer: string
  ): Promise<void> {
    const user: User = await this._repo.users.get(userId);
    const animal: Animal = await this._repo.animals.get(animalId);
    if (!user || !animal) throw new ErrorRequest("Bad request", 400);

    const animals = await this._repo.users.getFavoriteAnimalsOfUser(userId);
    if (animals.some(animal => animal.id === animalId)) return null;

    await this._repo.users.addFavoriteAnimal(userId, animalId);
    return null;
  }

  @Get("/:id/favorite")
  @Status(200)
  @Description("Login")
  @Returns(400, { description: "Bad Request" })
  public async getFavorite(
    @PathParams("id") userId: number,
    @Required() @HeaderParams("Authorization") bearer: string
  ): Promise<object> {
    const { id } = verifToken(bearer);
    if (id != userId) throw new ErrorRequest("unauthorized", 401);
    const animals = await this._repo.users.getFavoriteAnimalsOfUser(userId);
    return { animals };
  }
}
