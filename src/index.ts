import 'reflect-metadata';
import { Server } from './server';
import { createConnection, Connection, getRepository } from 'typeorm';
import { Animal } from './models/animal';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { Diet } from './models/diet';

// Read json file
const jsonReader = filePath => {
  // console.log(filePath)
  if (!existsSync(filePath)) {
    console.log('❌  File not found');
  }
  try {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error parsing JSON string:', error);
  }
};

async function main(): Promise<void> {
  try {
    // On se connecte à la db
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.synchronize(true);

    // cwd = current working directory
    const animals = jsonReader(path.join(process.cwd(), 'data.json'));

    // Retourne la liste (tableau) des animaux avec uniquement les champs qui nous intéressent
    const animalCleanup = animals.map(animal => {
      const {
        name,
        scientific_name: scientificName,
        colour: color,
        skin_type: skinType,
        status,
        img,
        size,
        weight,
        gestation,
        litter_size: litterSize,
        lifespan: lifespan,
        fun_fact: funFact,
        habitat,
        class: category,
        prey,
        diet,
        group_behaviour: groupBehaviour,
        predator,
        biggest_threat: biggestThreat
      } = animal;

      return {
        name,
        scientificName,
        color,
        skinType,
        status,
        img,
        size,
        weight,
        gestation,
        litterSize,
        lifespan,
        funFact,
        habitat,
        category,
        prey,
        diet,
        groupBehaviour,
        predator,
        biggestThreat
      };
    });

    // Retourne la liste (tableau) des régimes alimentaires (diet)
    const diets = animals.map(animal => {
      const { diet: name } = animal;
      return {
        name
      };
    });

    // ✅ - add all diet in db
    await insertDiets(connection, diets);

    // Récupère un régime alimentaire (diet) depuis la db
    // const plop = await getRepository(Diet)
    //   .createQueryBuilder('diet')
    //   .where('diet.id = :id OR diet.name = :name', { id: 1, name: 'Herbivore' })
    //   .getOne();

    // const herbivore = await getRepository(Diet).findOne({
    //   id: 1,
    //   name: 'Herbivore'
    // });

    // const allDiets = await getRepository(Diet)
    //   .createQueryBuilder('diet')
    //   .getMany();

    // console.log('🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤');
    // console.log(typeof allDiets);
    // console.log(allDiets);
    // console.log('🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤');

    // ❌ - add | update | delete an animal
    // await insertAnimals(connection, animalCleanup);
    // await insertAnimal(connection);
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

const insertDiets = (connection: Connection, diets: [Diet]) => {
  let dietNames = [];
  // Si le tableau dietNames ne contient pas dietName, alors on l'ajoute
  diets.map(diet => {
    if (!dietNames.includes(diet.name)) {
      dietNames.push(diet.name);
    }
  });

  // Convertis le tableau dietNames en Objet et lui ajoute une propriété name correspondant au régime alimentaire
  const allDiets = dietNames.map(dietName => {
    return { name: dietName };
  });

  //
  connection
    .createQueryBuilder()
    .insert()
    .into(Diet)
    .values(allDiets)
    .execute();
};

const insertAnimals = (connection: Connection, animals: [Animal]) => {
  animals.map(animal => {
    insertAnimal(connection, animal);
  });
};

const insertAnimal = (connection: Connection, animal: Animal) => {
  connection
    .createQueryBuilder()
    .insert()
    .into(Animal)
    .values(animal)
    .execute();
};

const updateAnimal = (connection: Connection) => {
  connection
    .createQueryBuilder()
    .update(Animal)
    .set({ name: 'Whale', color: 'Blue' })
    .where('id = :id', { id: 1 })
    .execute();
};

const deleteAnimal = (connection: Connection) => {
  connection
    .createQueryBuilder()
    .delete()
    .from(Animal)
    .where('id = :id', { id: 1 })
    .execute();
};

/**
 * animal ->
 *    - si l'habitat n'existe pas, on l'ajoute dans la table `Habitat`
 *        - puis on ajoute les ids `animal_id` et `habitat_id` dans la table de jointure `animal_has_habitat`
 *    - si l'habitat existe, on récupère son id dans la table `Habitat`
 *        - puis on ajoute les ids `animal_id` et `habitat_id` dans la table de jointure `animal_has_habitat`
 */

//  const isHabitatExist = () => {

//  }
