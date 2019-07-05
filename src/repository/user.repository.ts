import { Base } from "./base.repository";
import { User } from "../models/user";
import { InsertResult, DeleteResult, getConnection } from "typeorm";
import { Animal } from "../models/animal";

export default class UserRepo extends Base<User> {
  constructor() {
    super(User);
  }

  public getByEmail(email: string): Promise<User> {
    return this.entities
      .createQueryBuilder()
      .where("User.email = :email", { email })
      .getOne();
  }

  public getByUsername(username: string): Promise<User> {
    return this.entities
      .createQueryBuilder()
      .where("User.username = :username", { username })
      .getOne();
  }

  public async getFavoriteAnimalsOfUser(id: number): Promise<Array<Animal>> {
    const user: User = await this.entities
      .createQueryBuilder()
      .leftJoinAndSelect("User.animals", "animals")
      .where(`"User"."id" = :id`, { id })
      .getOne();
    return user.animals;
  }

  public async addFavoriteAnimal(
    userId: number,
    animalId: number
  ): Promise<InsertResult> {
    return this.entities
      .createQueryBuilder()
      .insert()
      .into("User_has_animals_favorites")
      .values({ userId, animalId })
      .execute();
  }

  public async removeFavoriteAnimal(
    userId: number,
    animalId: number
  ): Promise<void> {
    return getConnection()
      .createQueryBuilder()
      .relation(User, "animals")
      .of(animalId)
      .remove(userId);
  }
}
