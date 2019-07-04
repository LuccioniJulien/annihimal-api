import { Base } from "./base.repository";
import { Predator } from "../models/predator";

export default class PredatorRepo extends Base<Predator> {
  constructor() {
    super(Predator);
  }
}
