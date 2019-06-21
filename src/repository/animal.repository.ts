import { getConnection } from "typeorm";
import { Animal } from "../models/animal";

export async function getAnimals(): Promise<Array<Animal>> {
  const animals: Array<Animal> = await getConnection()
    .getRepository(Animal)
    .find();
  return animals;
}
