import * as express from "express";
import { get } from "controllers";

const router = express.Router();

/* GET home page. */
router.get("/", get);

export default router;
