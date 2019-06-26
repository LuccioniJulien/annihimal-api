import { Animal } from "../models/animal";

export default interface IAnimalRepo {
  getAll(): Promise<Array<Animal>>;
  get(id:number): Promise<Animal>;
}
