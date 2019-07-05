import { Base } from "./base.repository";
import { Threat } from "../models/Threat";

export default class ThreatRepo extends Base<Threat> {
  constructor() {
    super(Threat);
  }
}
