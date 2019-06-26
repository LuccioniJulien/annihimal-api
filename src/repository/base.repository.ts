import { getConnection, Repository } from "typeorm";
import IBase from "../interfaces/IBase";

export abstract class Base<T> implements IBase<T> {
  entities: Repository<T>;

  constructor(modelClass: { new (): T }) {
    this.entities = getConnection().getRepository(modelClass);
  }

  async getAll(): Promise<Array<T>> {
    return this.entities.find();
  }

  async get(id: number): Promise<T> {
    return this.entities.findOne(id);
  }
}
