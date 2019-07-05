import { Base } from "./base.repository";
import { Habitat } from "../models/habitat";

export default class HabitatRepo extends Base<Habitat> {
  constructor() {
    super(Habitat);
  }
}
