import "reflect-metadata";
import { createConnection } from "typeorm";
import server from "./expess";

const main = async () => {
  try {
    // const connection = await createConnection();
    // await connection.dropDatabase();
    // await connection.synchronize(true);

    const port: number = parseInt(process.env.PORT) || 4242;
    const isRunning: boolean = await server(port);
    if (isRunning) {
      console.log(`Server now running on port ${port}`);
    } else {
      throw "Something went wrong.....";
    }
  } catch (error) {
    console.log(error);
  }
};

main();
