import * as express from "express";
import * as bodyParser from "body-parser";

import animalRouter from "./routes/animal.route";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/animals", animalRouter);

const server = (port): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    app.listen(port, error => {
      if (error != null) {
        console.log(error);
        reject(false);
      }
      resolve(true);
    });
  });
};

export default server;
