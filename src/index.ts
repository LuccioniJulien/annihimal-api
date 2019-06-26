import "reflect-metadata";
import { Server } from "./server";
import { createConnection } from "typeorm";

async function main(): Promise<void> {
  try {
    // On se connecte à la db
    await createConnection();
    // On lance le serveur
    await new Server().start();
    console.log("Server started");
  } catch (error) {
    console.log(error.message);
  }
}

main();
