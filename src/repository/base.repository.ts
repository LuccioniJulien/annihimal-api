import { getConnection, Repository } from "typeorm";

export abstract class Base<T> {
  entities: Repository<T>;

  constructor(modelClass: { new (): T }) {
    this.entities = getConnection().getRepository(modelClass);
  }

  public async getAll(): Promise<Array<T>> {
    return this.entities.find();
  }

  public async get(id: number): Promise<T> {
    return this.entities.findOne(id);
  }
}
