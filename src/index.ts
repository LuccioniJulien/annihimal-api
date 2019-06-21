import "reflect-metadata";
import { createConnection } from "typeorm";

const main = async () => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize(true);
};

main();
