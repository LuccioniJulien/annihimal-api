import "reflect-metadata";
import { Server } from "./server";
import { createConnection, Connection } from "typeorm";
import { Animal } from "./models/animal";

import { existsSync, readFileSync } from 'fs';
import * as  path from 'path';

const jsonReader = filePath => {
  // console.log(filePath)

  if(!existsSync(filePath)) {
    console.log("❌  File not found");
  }
  try {
    const data = readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log('Error parsing JSON string:', error)
  }
}

async function main(): Promise<void> {

  try {
    // On se connecte à la db
    // const connection = await createConnection();
    // await connection.dropDatabase();
    // await connection.synchronize(true);

    const animals = jsonReader(path.join(process.cwd(), "data.json"));
    console.log(typeof animals);

    const cleanAnimal = animals.map( animal => {
      const { name, colour: color} = animal
      return {
        name,
        color
      }
    })
    
    console.log("😃", cleanAnimal);
    

    // On lance le serveur
    // await new Server().start();
    // console.log("Server started");

    // TEST - add | update | delete an animal
    // await insertAnimal(connection)
    // await updateAnimal(connection)
    // await deleteAnimal(connection)
        
  } catch (error) {
    console.log(error.message);
  }
}

main();


/**
 * ============================================================================
 * helpers functions
 * */

const insertAnimal = (connection: Connection) => {
  connection
    .createQueryBuilder()
    .insert()
    .into(Animal)
    .values([
        { name: "Koala", color: "grey", }
    ])
    .execute();
}

const updateAnimal = (connection: Connection) => {
  connection
    .createQueryBuilder()
    .update(Animal)
    .set({ name: "Whale", color: "Blue" })
    .where("id = :id", { id: 1 })
    .execute();
}

const deleteAnimal = (connection: Connection) => {
  connection
    .createQueryBuilder()
    .delete()
    .from(Animal)
    .where("id = :id", { id: 1 })
    .execute();
}

/**
 * animal ->
 *    - si l'habitat n'existe pas, on l'ajoute dans la table `Habitat`
 *        - puis on ajoute les ids `animal_id` et `habitat_id` dans la table de jointure `animal_has_habitat`
 *    - si l'habitat existe, on récupère son id dans la table `Habitat`
 *        - puis on ajoute les ids `animal_id` et `habitat_id` dans la table de jointure `animal_has_habitat`
 */


//  const isHabitatExist = () => {

//  }

