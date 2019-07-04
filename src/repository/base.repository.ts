import { getConnection, Repository, InsertResult } from "typeorm";

export abstract class Base<T> {
  entities: Repository<T>;

  constructor(modelClass: { new (): T }) {
    this.entities = getConnection().getRepository(modelClass);
  }

  public getAll(
    skip: number = 0,
    take: number = 10,
    orderBy: string = "ASC"
  ): Promise<Array<T>> {
    return this.entities
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getMany();
  }

  public get(id: number): Promise<T> {
    return this.entities.findOne(id);
  }

  public async insert(value: T): Promise<InsertResult> {
    return this.entities.insert(value);
  }
}
