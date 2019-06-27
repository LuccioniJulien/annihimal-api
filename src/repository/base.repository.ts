import { getConnection, Repository } from "typeorm";

export abstract class Base<T> {
  entities: Repository<T>;

  constructor(modelClass: { new (): T }) {
    this.entities = getConnection().getRepository(modelClass);
  }

  public getAll(skip: number = 0, take: number = 10): Promise<Array<T>> {
    return this.entities
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .execute();
  }

  public get(id: number): Promise<T> {
    return this.entities.findOne(id);
  }
}
