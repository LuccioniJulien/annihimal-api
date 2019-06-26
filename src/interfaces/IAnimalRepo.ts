import { Animal } from "../models/animal";

export default interface IAnimalRepo {
  get(): Promise<Array<Animal>>;
}
