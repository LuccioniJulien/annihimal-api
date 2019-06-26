import { getConnection, Repository } from "typeorm";
import IBase from "../interfaces/IBase";

export abstract class Base<T> implements IBase<T> {
  entities: Repository<T>;

  constructor(modelClass: { new (): T }) {
    this.entities = getConnection().getRepository(modelClass);
  }

  async get(): Promise<Array<T>> {
    const animals: Array<T> = await this.entities.find();
    return animals;
  }
}
