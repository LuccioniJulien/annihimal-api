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
import { Habitat } from './models/habitat';
import { Threat } from './models/threat';
import { Prey } from './models/prey';
import { Predator } from './models/predator';

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
      habitat: habitatNames,
      class: className,
      prey: preyName,
      diet: dietName,
      lifestyle: lifeStyle,
      group_behaviour: groupBehaviour,
      predators: predatorName,
      biggest_threat: biggestThreat,
    } = animal;

    try {
      const myAnimal = new Animal()

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
        myAnimal.group_Behavior = behaviour
      }
      const habitats: Array<Habitat> = await getHabitats(connection, habitatNames);
      const threats: Array<Threat> = await getThreats(connection, biggestThreat)
      const preys: Array<Prey> = await getPreys(connection, animal["main_prey"] || animal["prey"])
      const predators: Array<Predator> = await getPredators(connection, predatorName)

      myAnimal.name = name
      myAnimal.size = animal["size_(h)"] || animal["size_(l)"]
      myAnimal.scientific_name = scientificName
      myAnimal.color = color
      myAnimal.skin_type = skinType
      myAnimal.status = status
      myAnimal.img = img
      myAnimal.weight = weight
      myAnimal.gestation = gestation
      myAnimal.litter_size = litterSize
      myAnimal.lifespan = lifespan
      myAnimal.fun_fact = funFact
      myAnimal.diet = diet
      myAnimal.class = category
      myAnimal.lifestyle = lifestyle


      // ✅ - add animal
      const { identifiers } = await insertAnimal(connection, myAnimal);
      const idAnimal = identifiers[0]

      for (const habitat of habitats) {
        await insertAnimalHabitat(connection, { habitatId: habitat.id, animalId: idAnimal })
      }

      for (const threat of threats) {
        await insertAnimalThreat(connection, { threatId: threat.id, animalId: idAnimal })
      }

      for (const prey of preys) {
        await insertAnimalPreys(connection, { preyId: prey.id, animalId: idAnimal })
      }

      for (const predator of predators) {
        await insertAnimalPredator(connection, { predatorId: predator.id, animalId: idAnimal })
      }



      console.log(identifiers)
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

const getHabitats = async (connection: Connection, habitatNames: String): Promise<Array<Habitat>> => {
  if (!habitatNames) {
    return []
  }
  let habitats = habitatNames.split(" and ")
  if (habitats.length >= 2) {
    habitats = habitats[0].split(',').concat(habitats[1]);
  }
  const myHabitats: Array<Habitat> = habitats.map(habitatName => {
    const h = new Habitat()
    h.name = habitatName.trim();
    return h;
  })

  const finalHabitats: Array<Habitat> = []

  for (const ha of myHabitats) {
    const tempHabit = await getHabitat(connection, ha)
    finalHabitats.push(tempHabit)

  }
  return finalHabitats;
}

const getThreats = async (connection: Connection, threatName: String): Promise<Array<Threat>> => {
  if (!threatName) {
    return []
  }
  let threats = threatName.split(" and ")
  if (threats.length >= 2) {
    threats = threats[0].split(',').concat(threats[1]);
  }
  const myThreats: Array<Threat> = threats.map(threatName => {
    const t = new Threat()
    t.name = threatName.trim().toLowerCase();
    return t;
  })

  const finalThreats: Array<Threat> = []

  for (const threat of myThreats) {
    const tempThreat = await getThreat(connection, threat)
    finalThreats.push(tempThreat)

  }
  return finalThreats;
}

const getPreys = async (connection: Connection, preyName: String): Promise<Array<Prey>> => {
  if (!preyName) {
    return []
  }
  const preys = preyName.split(',');
  const myPreys: Array<Threat> = preys.map(preyName => {
    const p = new Prey()
    p.name = preyName.trim().toLowerCase();
    return p;
  })

  const finalPreys: Array<Prey> = []

  for (const preys of myPreys) {

    const tempPrey = await getPrey(connection, preys)
    finalPreys.push(tempPrey)

  }
  return finalPreys;
}

const getPredators = async (connection: Connection, predatorName: String): Promise<Array<Predator>> => {
  if (!predatorName) {
    return []
  }
  const predator = predatorName.split(',');
  const myPredators: Array<Threat> = predator.map(predatorName => {
    const p = new Prey()
    p.name = predatorName.trim().toLowerCase();
    return p;
  })

  const finalPredators: Array<Predator> = []

  for (const predator of myPredators) {
    const tempPredator = await getPredator(connection, predator)
    finalPredators.push(tempPredator)

  }
  return finalPredators;
}

const getPredator = async (connection: Connection, predator: Predator): Promise<Predator> => {

  let maybePredator: Predator = await connection
    .getRepository(Predator)
    .createQueryBuilder()
    .where("Predator.name = :name", { name: predator.name })
    .getOne()

  if (!maybePredator) {
    await insertPredator(connection, predator)
    maybePredator = await connection
      .getRepository(Predator)
      .createQueryBuilder()
      .where("Predator.name = :name", { name: predator.name })
      .getOne()
  }
  return maybePredator
}



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

const getHabitat = async (connection: Connection, habitat: Habitat): Promise<Habitat> => {

  let maybeHabitat: Habitat = await connection
    .getRepository(Habitat)
    .createQueryBuilder()
    .where("Habitat.name = :name", { name: habitat.name })
    .getOne()

  if (!maybeHabitat) {
    await insertHabitat(connection, habitat)
    maybeHabitat = await connection
      .getRepository(Habitat)
      .createQueryBuilder()
      .where("Habitat.name = :name", { name: habitat.name })
      .getOne()
  }
  return maybeHabitat
}

const getThreat = async (connection: Connection, threat: Threat): Promise<Threat> => {

  let maybeThreat: Threat = await connection
    .getRepository(Threat)
    .createQueryBuilder()
    .where("Threat.name = :name", { name: threat.name })
    .getOne()

  if (!maybeThreat) {
    await insertThreat(connection, threat)
    maybeThreat = await connection
      .getRepository(Threat)
      .createQueryBuilder()
      .where("Threat.name = :name", { name: threat.name })
      .getOne()
  }
  return maybeThreat
}

const getPrey = async (connection: Connection, prey: Prey): Promise<Prey> => {

  let maybePrey: Prey = await connection
    .getRepository(Prey)
    .createQueryBuilder()
    .where("Prey.name = :name", { name: prey.name })
    .getOne()

  if (!maybePrey) {
    await insertPrey(connection, prey)
    maybePrey = await connection
      .getRepository(Prey)
      .createQueryBuilder()
      .where("Prey.name = :name", { name: prey.name })
      .getOne()
  }
  return maybePrey
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

const insertHabitat = (connection: Connection, habitat: Habitat): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Habitat)
    .values(habitat)
    .execute();
};

const insertAnimalHabitat = (connection: Connection, animalHabitat: any): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into("Animal_has_habitats")
    .values(animalHabitat)
    .execute();
};

const insertPredator = (connection: Connection, predator: Predator): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Predator)
    .values(predator)
    .execute();
};

const insertAnimalPredator = (connection: Connection, animalPredator: any): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into("Animal_has_predators")
    .values(animalPredator)
    .execute();
};

const insertThreat = (connection: Connection, threat: Threat): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Threat)
    .values(threat)
    .execute();
};

const insertAnimalThreat = (connection: Connection, animalThreat: any): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into("Animal_has_threaths")
    .values(animalThreat)
    .execute();
};

const insertPrey = (connection: Connection, prey: Prey): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(Prey)
    .values(prey)
    .execute();
};

const insertAnimalPreys = (connection: Connection, aniamalPreys: any): Promise<InsertResult> => {
  return connection
    .createQueryBuilder()
    .insert()
    .into("Animal_has_preys")
    .values(aniamalPreys)
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
