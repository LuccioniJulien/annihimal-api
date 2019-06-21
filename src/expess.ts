import * as express from "express";
import * as bodyParser from "body-parser";

import router from "./routes/index.route";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api", router);

const server = (port: number): Promise<boolean> => {
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
