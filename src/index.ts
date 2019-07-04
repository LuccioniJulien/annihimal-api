import 'reflect-metadata';
import { Server } from './server';
import { createConnection, Connection, getRepository, InsertResult } from 'typeorm';
import { Animal } from './models/animal';

import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { Diet } from './models/diet';
import { Class } from './models/class';
import { Lifestyle } from './models/lifestyle';
import { Group_Behavior } from './models/group_Behavior';

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

  // On se connecte à la db
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize(true);

  // cwd = current working directory
  const animals = jsonReader(path.join(process.cwd(), 'data.json'));

  const insert = async animal => {
    const {
      name,
      scientific_name: scientificName,
      colour: color,
      skin_type: skinType,
      conservation_status: status,
      img,
      size,
      weight,
      gestation_period: gestation,
      ["average_litter size"]: litterSize,
      lifespan: lifespan,
      fun_fact: funFact,
      habitat,
      class: className,
      prey,
      diet: dietName,
      lifestyle: lifeStyle,
      group_behaviour: groupBehaviour,
      predator,
      biggest_threat: biggestThreat
    } = animal;

    try {
      const animal = new Animal()

      const currentDiet = new Diet()
      currentDiet.name = dietName

      const currentCategory = new Class()
      currentCategory.name = className

      const currentLifestyle = new Lifestyle()
      currentLifestyle.name = lifeStyle

      const currentGroupBehaviour = new Group_Behavior()
      currentGroupBehaviour.name = groupBehaviour

      const diet: Diet = await getDiet(connection, currentDiet);
      const category: Class = await getCategory(connection, currentCategory);
      const lifestyle: Lifestyle = await getLifestyle(connection, currentLifestyle);
      if (groupBehaviour) {
        const behaviour: Group_Behavior = await getBehaviour(connection, currentGroupBehaviour);
        animal.group_Behavior = behaviour
      }

      animal.name = name
      animal.size = animal["size_(h)"] || animal["size_(l)"]
      animal.scientific_name = scientificName
      animal.color = color
      animal.skin_type = skinType
      animal.status = status
      animal.img = img
      animal.weight = weight
      animal.gestation = gestation
      animal.litter_size = litterSize
      animal.lifespan = lifespan
      animal.fun_fact = funFact
      animal.diet = diet
      animal.class = category
      animal.lifestyle = lifestyle

      // ✅ - add animal
      await insertAnimal(connection, animal);
    } catch (error) {
      console.log(error.message)
    }
  };

  for (const animal of animals) {
    await insert(animal)
  }
}

main();

/**
 * ============================================================================
 * helpers functions
 * */

const getDiet = async (connection: Connection, diet: Diet): Promise<Diet> => {

  let maybeDiet: Diet = await connection
    .getRepository(Diet)
    .createQueryBuilder()
    .where("Diet.name = :name", { name: diet.name })
    .getOne()

  if (!maybeDiet) {
    await insertDiet(connection, diet)
    maybeDiet = await connection
      .getRepository(Diet)
      .createQueryBuilder()
      .where("Diet.name = :name", { name: diet.name })
      .getOne()
  }
  return maybeDiet
}

const getCategory = async (connection: Connection, category: Class): Promise<Class> => {

  let maybeClass: Class = await connection
    .getRepository(Class)
    .createQueryBuilder()
    .where("Class.name = :name", { name: category.name })
    .getOne()

  if (!maybeClass) {
    await insertCategory(connection, category)
    maybeClass = await connection
      .getRepository(Class)
      .createQueryBuilder()
      .where("Class.name = :name", { name: category.name })
      .getOne()
  }
  return maybeClass
}

const getLifestyle = async (connection: Connection, lifestyle: Lifestyle): Promise<Lifestyle> => {

  let maybeLifestyle: Class = await connection
    .getRepository(Class)
    .createQueryBuilder()
    .where("Class.name = :name", { name: lifestyle.name })
    .getOne()

  if (!maybeLifestyle) {
    await insertLifestyle(connection, lifestyle)
    maybeLifestyle = await connection
      .getRepository(Lifestyle)
      .createQueryBuilder()
      .where("Lifestyle.name = :name", { name: lifestyle.name })
      .getOne()
  }
  return maybeLifestyle
}

const getBehaviour = async (connection: Connection, behaviour: Group_Behavior): Promise<Group_Behavior> => {

  let maybeBehaviour: Group_Behavior = await connection
    .getRepository(Group_Behavior)
    .createQueryBuilder()
    .where("Group_Behavior.name = :name", { name: behaviour.name })
    .getOne()

  if (!maybeBehaviour) {
    await insertBehaviour(connection, behaviour)
    maybeBehaviour = await connection
      .getRepository(Group_Behavior)
      .createQueryBuilder()
      .where("Group_Behavior.name = :name", { name: behaviour.name })
      .getOne()
  }
  return maybeBehaviour
}

const insertDiet = (connection: Connection, diet: Diet): Promise<InsertResult> =>
  connection
    .createQueryBuilder()
    .insert()
    .into(Diet)
    .values(diet)
    .execute();
;

const insertCategory = (connection: Connection, category: Class): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Class)
    .values(category)
    .execute();
};

const insertLifestyle = (connection: Connection, lifestyle: Lifestyle): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Lifestyle)
    .values(lifestyle)
    .execute();
};

const insertBehaviour = (connection: Connection, behaviour: Group_Behavior): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Group_Behavior)
    .values(behaviour)
    .execute();
};

const insertAnimal = (connection: Connection, animal: Animal) => {
  return connection
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
