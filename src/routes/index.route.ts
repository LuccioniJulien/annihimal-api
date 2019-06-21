import * as express from "express";
import * as fs from "fs";

const router = express.Router();

fs.readdirSync(__dirname)
  .filter(x => x != "index.route.ts")
  .forEach(file => {
    const route = require(__dirname + "/" + file).default;
    router.use(`/${file.split(".")[0]}s`, route);
  });

export default router;
