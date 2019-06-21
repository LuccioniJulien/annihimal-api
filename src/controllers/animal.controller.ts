import * as express from "express";
import { getAnimals } from "../repository/animal.repository";
import { Animal } from "../models/animal";

export async function get(
  request: express.Request,
  response: express.Response
): Promise<void> {
  try {
    const animals: Array<Animal> = await getAnimals();
    response.status(200).send(JSON.stringify(animals));
  } catch (error) {
    response.status(500);
  }
}
