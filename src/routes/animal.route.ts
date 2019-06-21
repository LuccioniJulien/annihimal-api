import * as express from "express";
import { get } from "../controllers/animal.controller";

const router = express.Router();

/* GET users listing. */
router.get("/", get);

export default router;
