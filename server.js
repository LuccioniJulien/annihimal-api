import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import routes from "routes";
import { createConnection ,getConnection} from "typeorm";
import  {Animal}  from "models/animal";


require("dotenv").config();

const app = express();
const port = parseInt(process.argv[2]) || process.env.PORT || 4242;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

async function main() {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "anihimal",
    entities: [Animal],
    autoSchemaSync: true,
    logging: true
  });
  await connection.synchronize(true);
  const oui = await getConnection().manager.find(Animal);
  console.log(...connection.driver.options.entities);
  //console.log(connection.options.entities);

  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is running on port ${port}`);
  });
}

main();
