import "reflect-metadata";
import { createConnection, Connection,  } from "typeorm";
import server from "./expess";
import { Animal } from "./models/animal";

const main = async () => {
  try {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.synchronize(true);

    // const port: number = parseInt(process.env.PORT) || 4242;
    // const isRunning: boolean = await server(port);
    // if (isRunning) {
    //   console.log(`Server now running on port ${port}`);
    // } else {
    //   throw "Something went wrong.....";
    // }


    // TEST - add an animal
    await insertAnimal(connection)

  } catch (error) {
    console.log(error);
  }
};

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
        { name: "Plop", color: "Yellow" }
    ])
    .execute();
}
