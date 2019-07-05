import { Base } from "./base.repository";
import { Prey } from "../models/prey";

export default class PreyRepo extends Base<Prey> {
  constructor() {
    super(Prey);
  }
}
